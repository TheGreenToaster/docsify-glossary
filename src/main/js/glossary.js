import {GlossaryConfigurationBuilder} from './configuration';

export function replaceTerm(term, content, term_id) {
	console.log(`detected glossary term: ${term}`);

	let link = ` [$1](/_glossary?id=${term_id}) `;
	let re = new RegExp(`\\s(${term})\\s`, 'ig');
	return content.replace(re, link);
}

export function addLinks(content, next, terms) {
	for (let term in terms) {
		content = replaceTerm(term, content, terms[term]);
	}
	next(content);
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
		if (line.startsWith(configuration.terminologyHeading)) {
			let term = line.replace(configuration.terminologyHeading, '').trim();
			dictionary[term] = term.toLowerCase().replace(' ', '-');
		}
	});

	return dictionary;
}

export function install(hook, _vm) {

	let configuration = new GlossaryConfigurationBuilder().build();
	hook.beforeEach(function (content, next) {

		if (window.location.hash.match(/_glossary/g)) {
			next(content);
			return;
		}

		if (!window.$docsify.terms) {
			fetch(configuration.glossaryLocation).then(function (data) {
				data.text().then(function (text) {
					window.$docsify.terms = loadTerminology(text, configuration);
				});
			});
		}

		addLinks(content, next, window.$docsify.terms);

	});
}
