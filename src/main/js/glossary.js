function replaceTermInLine(term, contentLine, linkId, config) {
    if(isTitle(contentLine) && !config.replaceTitleTerms) {
        // Intentionally not combined in the return statement, to avoid superfluous calculations
        return contentLine;
    }

    let re = new RegExp(`\\s(${term})[\\s$]`, 'ig');

    let reFullStop = new RegExp(`\\s(${term}).`, 'ig');
    let reComma = new RegExp(`\\s(${term}),`, 'ig');

    let link = ` [$1](/_glossary?id=${linkId})`;

    let replacement = contentLine.replace(reComma, link + ',')
            .replace(re, link + ' ')
            .replace(reFullStop, link + '.');

    return isTitle(contentLine) ? replacement.replaceAll(`[${term}]`, `[ ${term}]`): replacement;
}

function isTitle(line) {
    return line.trim().startsWith('#');
}

export function replaceTerm(content, term, linkId, config) {
    let processedText = '';

    let codeBlockContext = false;
    content.split('\n').forEach( (line, _index) => {
        if(line.trim().startsWith('```')) {
            codeBlockContext = !codeBlockContext;
        }

        let replacedLine = line;
        if(line.trim().length > 0 && !codeBlockContext) {
            replacedLine = replaceTermInLine(term, line + ' ', linkId, config).trimEnd();
        }
        processedText += replacedLine + '\n';
    });

    return processedText;
}

export function addLinks(content, terms, config) {
    let textWithReplacements = content;
    if (config.debug) {
        console.log(`Adding links for terminology: ${terms}`);
    }
    for (let term in terms) {
        textWithReplacements = replaceTerm(textWithReplacements, term, terms[term], config);
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
