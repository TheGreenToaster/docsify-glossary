export function install(hook, _vm) {
	hook.beforeEach(function (content, next) {

		let defaultTerminologyHeading = '#####';
		let glossaryFileName = '_glossary.md';

		if (window.location.hash.match(/_glossary/g)) {
			next(content);
			return;
		}

		let replaceTerm = function (term, content, term_id) {
			console.log(`detected glossary term: ${term}`);

			let link = ` [$1](/_glossary?id=${term_id}) `;
			let re = new RegExp(`\\s(${term})\\s`, 'ig');
			return content.replace(re, link);
		};

		let addLinks = function (content, next, terms) {
			for (let term in terms) {
				content = replaceTerm(term, content, terms[term]);
			}
			next(content);
		};

		let loadTerminology = function (text) {
			let lines = text.split('\n');
			lines.forEach(function (line) {
				if (line.match('/' + defaultTerminologyHeading + '/g')) {
					let term = line.replace(defaultTerminologyHeading, '').trim();
					window.$docsify.terms[term] = term.toLowerCase().replace(' ','-');
				}
			});
		};

		if (!window.$docsify.terms) {
			fetch(glossaryFileName).then(function (data) {
				data.text().then(function (text) {
					window.$docsify.terms = {};
					loadTerminology(text);
				});
			});
		}
    
		addLinks(content, next, window.$docsify.terms);

	});
}
