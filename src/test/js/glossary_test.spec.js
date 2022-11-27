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
});

