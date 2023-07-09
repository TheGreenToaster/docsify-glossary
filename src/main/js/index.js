import {addLinks, loadTerminology} from './glossary';
import {configFromYaml, defaultGlossifyConfig} from './configuration';

function injectTerminologyInContent(content, configuration, next) {
    content = addLinks(content, window.$docsify.terms, configuration);
    next(content);
}

function loadProperties() {
    if (window.$docsify !== undefined && window.$docsify.glossify !== undefined) {
        const configuredProperties = window.$docsify.glossify;
        return configFromYaml(configuredProperties);
    } else {
        return defaultGlossifyConfig();
    }
}

export function install(hook, _vm) {

    let configuration = loadProperties();
    if (configuration.debug) {
        console.log(`Using config options: ${configuration.glossaryLocation}, ${configuration.terminologyHeading}`);
    }
    hook.beforeEach(function (content, next) {

        if (window.location.hash.match(/_glossary/g)) {
            next(content);
            return;
        }

        if (!window.$docsify.terms) {
            fetch(configuration.glossaryLocation)
                    .then(function (data) {
                        data.text()
                                .then(function (text) {
                                    window.$docsify.terms = loadTerminology(text, configuration);
                                    injectTerminologyInContent(content, configuration, next);
                                });
                    });
        }

        injectTerminologyInContent(content, configuration, next);
    });
}

if (!window.$docsify) {
    window.$docsify = {};
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(install);


