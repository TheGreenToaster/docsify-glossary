import {loadTerminology} from '../../main/js/glossary';
import {describe, expect, it} from '@jest/globals';
import {parse} from 'yaml';
import {GlossaryConfigurationBuilder} from '../../main/js/configuration';

describe('Glossary package', () => {

	it('test runner and code load correctly', () => {
		expect(true).toEqual(true);
	});

	it('can be configured from the docsify settings', () => {
		const configurationYaml = `
			glossify: {
        terminologyHeading: '####',
        glossaryLocation: '_glossary.md',
        debug: true
    	}`;

		const parsedConfig = parse(configurationYaml);

		let parsedConfiguration= GlossaryConfigurationBuilder.fromConfig(parsedConfig['glossify']);

		expect(parsedConfiguration.terminologyHeading).toEqual('####');
		expect(parsedConfiguration.glossaryLocation).toEqual('_glossary.md');
		expect(parsedConfiguration.debug).toEqual(true);
	});

});

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
		let config = new GlossaryConfigurationBuilder()
			.withTermHeading('###')
			.build();
		let dictionary = loadTerminology(sourceText, config);

		['API', 'Asymmetric clustering', 'Asymmetric multiprocessing',
			'Blade servers', 'Bootstrap program', 'BlaBla'].forEach(
			expectedTerm => {
				expect(dictionary[expectedTerm]).toBeTruthy();
				expect(dictionary[expectedTerm]).toHaveLength(expectedTerm.length);
			}
		);

	});
});

