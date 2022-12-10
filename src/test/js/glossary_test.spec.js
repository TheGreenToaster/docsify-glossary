import {beforeEach, describe, expect, it} from '@jest/globals';
import {addLinks, loadTerminology} from '../../main/js/glossary';
import {defaultGlossifyConfig, glossifyConfig} from '../../main/js/configuration';

describe('Dictionary parser', () => {
    let sourceText = `
## A

### API

Application Program Interface. Specifies a set of software functions that are made available to an application
programmer. The API typically includes function names, the parameters that can be passed into each functions, and a
description of the return values one can expect.

### Asymmetric clustering

Also known as a failover configuration.
One machine is in hot-standby mode and does nothing by monitor the other. In case of failure, the hot-standby takes
over.

### Asymmetric multiprocessing

Each processor is assigned to a single task. One processor is called the _master (or main) processor_, and controls the
system.

## B

### BlaBla

### Blade servers

A single chassis with multiple processor boards, I/O boards, and networking boards. Each processor board boots
independently and runs its own operating system.

### Bootstrap program

An initial program, usually stored on ROM or EEPROM memory, to initiallize all aspects of the system.
`;

    it('can be loaded from a markdown file', () => {
        let config = glossifyConfig()
                .withTermHeading('###')
                .build();
        let dictionary = loadTerminology(sourceText, config);

        ['API', 'Asymmetric clustering', 'Asymmetric multiprocessing',
            'Blade servers', 'Bootstrap program', 'BlaBla'].forEach(
            expectedTerm => {
                expect(dictionary[expectedTerm])
                        .toBeTruthy();
                expect(dictionary[expectedTerm])
                        .toHaveLength(expectedTerm.length);
            }
        );
    });

    it('can deal with preceding whitespace', () => {

        const textPrefixedWithWhitespaces = `
    
              ##### Indentation
              
              Dictionary loading should be able to deal with text that is prefixed with multiple whitespace characters.
      `;

        let result = loadTerminology(textPrefixedWithWhitespaces, defaultGlossifyConfig());

        expect(result['Indentation'])
                .toBeTruthy();
    });
});

describe('Glossary terminology injection', () => {
    let sourceText;
    let config;
    let dictionary;

    beforeEach(() => {
        sourceText = `
    ##### API
    
    Application Program Interface. Specifies a set of software functions that are made available to an application
    programmer. The API typically includes function names, the parameters that can be passed into each functions, and a
    description of the return values one can expect.
  `;
        config = defaultGlossifyConfig();
        dictionary = loadTerminology(sourceText, config);
        expect(dictionary['API'])
                .toBeTruthy();
    });

    it('Can deal with sequences of terms', () => {
        const textWithMultipleOccurrences = 'Some API is configured to use another API. API, API API.';

        const result = addLinks(textWithMultipleOccurrences, dictionary, config);

        expect([...result.matchAll('/_glossary\\?id=api')]).toHaveLength(5);
    });

    it('preserves spaces in title sequences', () => {
        const textWithTitle = `
          ## Information about the API
          
          Some API is configured to use another API.
      `;

        const result = addLinks(textWithTitle, dictionary, config);

        expect(result).toContain('## Information about the [ API](/_glossary?id=api)');
    });

    it('Word replacement in title sequences can be disabled', () => {
        const textWithTile = `
            # This is an API title
            
            This is a paragraph of text, explain stuff and mentioning the term API.
       `;

        const configuration = glossifyConfig().withTitleTermReplacement(false)
                .build();

        let result = addLinks(textWithTile, dictionary, configuration);

        expect(result).toContain('# This is an API title');
    });

    it('Word replacement is not executed within code blocks', () => {
        const codeBlockWithTerminologyUsage = `
            \`\`\`java
            /**
            * Some dummy code using a term from the glossary, to ensure the words are not replaced within code blocks.
            * We expect the following code fragment to stay as it was originally written
            */
            public String getApiName() {
              API api = apiService.fetchApis();
              return api.getName()
            }
            \`\`\`
       `;

        const configuration = glossifyConfig()
                .withTitleTermReplacement(false)
                .build();

        let result = addLinks(codeBlockWithTerminologyUsage, dictionary, configuration);

        expect(result).toContain('API api = apiService.fetchApis();');
        expect([...result.matchAll('/_glossary\\?id=api')]).toHaveLength(0);
    });

    it('Word replacement is enabled after code block closes', () => {
        const codeBlockWithTerminologyUsage = `
            \`\`\`java
            public String getApiName() {
              API api = apiService.fetchApis();
              return api.getName()
            }
            \`\`\`
            
            The above example fetches the version of a certain API specification.
       `;

        const configuration = glossifyConfig()
                .withTitleTermReplacement(false)
                .build();

        let result = addLinks(codeBlockWithTerminologyUsage, dictionary, configuration);

        expect(result).toContain('API api = apiService.fetchApis();');
        expect([...result.matchAll('/_glossary\\?id=api')]).toHaveLength(1);
    });
});

