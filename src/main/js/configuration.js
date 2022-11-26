let DEFAULT_TERM_HEADING = '#####';
let DEFAULT_GLOSSARY_FILE_NAME = '_glossary.md';

export class GlossaryConfigurationBuilder {
	terminologyHeading = '';
	glossaryLocation = '';
	debug = false;

	constructor() {
		this.terminologyHeading = DEFAULT_TERM_HEADING;
		this.glossaryLocation = DEFAULT_GLOSSARY_FILE_NAME;
	}

	withTermHeading(heading) {
		this.terminologyHeading = heading;
		return this;
	}

	withGlossaryLocation(glossaryLocation) {
		this.glossaryLocation = glossaryLocation;
		return this;
	}

	withDebugEnabled(enableDebug) {
		this.debug = enableDebug;
		return this;
	}

	build() {
		return {...this};
	}

	static fromConfig(configurationYaml) {
		return new GlossaryConfigurationBuilder()
			.withTermHeading(configurationYaml.terminologyHeading??DEFAULT_TERM_HEADING)
			.withGlossaryLocation(configurationYaml.glossaryLocation??DEFAULT_GLOSSARY_FILE_NAME)
			.withDebugEnabled(configurationYaml.debug??false)
			.build();
	}
}
