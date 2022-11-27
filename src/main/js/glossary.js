export function replaceTerm(term, content, term_id) {
    let link = ` [$1](/_glossary?id=${term_id})`;

    let re = new RegExp(`\\s(${term})\\s`, 'ig');
    let reFullStop = new RegExp(`\\s(${term}).`, 'ig');
    let reComma = new RegExp(`\\s(${term}),`, 'ig');

    return content
            .replace(reComma, link + ',')
            .replace(re, link + ' ')
            .replace(reFullStop, link + '.');
}

export function addLinks(content, terms, config) {
    let textWithReplacements = content;
    if (config.debug) {
        console.log(`Adding links for terminology: ${terms}`);
    }
    for (let term in terms) {
        textWithReplacements = replaceTerm(term, textWithReplacements, terms[term]);
    }
    return textWithReplacements;
}

/**
 * @param {string} text
 * @param configuration
 * @return {string[]} dictionary with terminology
 */
export function loadTerminology(text, configuration) {
    let lines = text.split('\n');
    let dictionary = {};
    lines.forEach(function (line) {
        if (line.trimStart().startsWith(configuration.terminologyHeading)) {
            let term = line.replace(configuration.terminologyHeading, '').trim();
            if (configuration.debug) {
                console.log(`detected glossary term: ${term}`);
            }
            dictionary[term] = term.toLowerCase()
                    .replace(' ', '-');
        }
    });

    return dictionary;
}
