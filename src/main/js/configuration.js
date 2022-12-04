export const DEFAULT_TERM_HEADING = '#####';
export const DEFAULT_GLOSSARY_FILE_NAME = '_glossary.md';

export class GlossaryConfigurationBuilder {
    terminologyHeading = '';
    glossaryLocation = '';
    debug = false;
    replaceTitleTerms = true;
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

    withTitleTermReplacement(enableTitleTermReplacement) {
        this.replaceTitleTerms = enableTitleTermReplacement;
        return this;
    }

    build() {
        return {...this};
    }
}

export function configFromYaml(configurationYaml) {
    return new GlossaryConfigurationBuilder()
            .withTermHeading(configurationYaml.terminologyHeading ?? DEFAULT_TERM_HEADING)
            .withGlossaryLocation(configurationYaml.glossaryLocation ?? DEFAULT_GLOSSARY_FILE_NAME)
            .withDebugEnabled(configurationYaml.debug ?? false)
            .withTitleTermReplacement(configurationYaml.replaceTitleTerms ?? true)
            .build();
}

export function glossifyConfig() {
    return new GlossaryConfigurationBuilder();
}

export function defaultGlossifyConfig() {
    return new GlossaryConfigurationBuilder()
            .build();
}

