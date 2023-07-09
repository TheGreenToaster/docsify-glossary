function replaceTermInLine(term, contentLine, linkId, config) {
    if(isTitle(contentLine) && !config.replaceTitleTerms) {
        // Intentionally not combined in the return statement, to avoid superfluous calculations
        return contentLine;
    }

    let re = new RegExp(
        String.raw`(\[.+?\]\(.+?\))|` + // match MD links in group 1
        String.raw`(?=\b)${term}(?=\b)` // match given term
        , 'ig');

    let compiledLink = config.glossaryLocation
            .replace('./', `${config.linkPrefix}/`)
            .replace('.md', '');
    let titleSpace = isTitle(contentLine) ? ' ' : '';
    let createLink = (match) => `[${titleSpace}${match}](/${compiledLink}?id=${
        linkId} ':class=glossaryLink')`;

    // only replace regular matches, replace matched group with itself
    return contentLine.replace(
        re, (match, group1) => group1 || createLink(match));
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
