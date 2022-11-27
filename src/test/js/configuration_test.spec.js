import {describe, expect, it} from '@jest/globals';
import {parse} from 'yaml';
import {configFromYaml, DEFAULT_GLOSSARY_FILE_NAME, DEFAULT_TERM_HEADING} from '../../main/js/configuration';

describe('Package configuration', () => {

    it('can be configured from the docsify settings', () => {
        const configurationYaml = `
			glossify: {
        terminologyHeading: '####',
        glossaryLocation: '_glossary.md',
        debug: true
    	}
    `;

        const parsedConfig = parse(configurationYaml);

        let parsedConfiguration = configFromYaml(parsedConfig['glossify']);

        expect(parsedConfiguration.terminologyHeading)
                .toEqual('####');
        expect(parsedConfiguration.glossaryLocation)
                .toEqual('_glossary.md');
        expect(parsedConfiguration.debug)
                .toEqual(true);
    });

    it('can handle empty configurations', () => {
        const configurationYaml = `
			glossify: {
    	}`;

        const parsedConfig = parse(configurationYaml);

        let parsedConfiguration = configFromYaml(parsedConfig['glossify']);

        expect(parsedConfiguration.terminologyHeading)
                .toEqual(DEFAULT_TERM_HEADING);
        expect(parsedConfiguration.glossaryLocation)
                .toEqual(DEFAULT_GLOSSARY_FILE_NAME);
        expect(parsedConfiguration.debug)
                .toEqual(false);
    });

});
