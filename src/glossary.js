export function install (hook, vm) {
    hook.beforeEach(function(content,next) {

        if(window.location.hash.match(/_glossary/g)){
          next(content);
          return;
        }

        let addLinks = function(content,next,terms){
          for (let term in terms){
            console.log(term);

            let link = ` [$1](/_glossary?id=${terms[term]}) `;
            let re = new RegExp(`\\s(${term})\\s`,'ig');
            content = content.replace(re,link);
          }
          next(content);
        }

        if(!window.$docsify.terms){
          fetch('_glossary.md').then(function(data){
            data.text().then(function(text){
              window.$docsify.terms = {};

              let lines = text.split('\n');

              lines.forEach(function(line){
                if(line.match(/#####/g)){
                  let term = line.replace('#####','').trim();
                  let id = term.toLowerCase().replace(' ','-');

                  window.$docsify.terms[term] = id;
                }
              });

              addLinks(content,next,window.$docsify.terms);
            })
          })
        } else{
          addLinks(content,next,window.$docsify.terms);
        }

      });
}