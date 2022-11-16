let DEFAULT_TERM_HEADING = '#####';
let DEFAULT_GLOSSARY_FILE_NAME = '_glossary.md';

export class GlossaryConfigurationBuilder {
	terminologyHeading = '';
	glossaryLocation = '';

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

	build() {
		return {...this};
	}
}
