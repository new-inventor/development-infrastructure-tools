import {SpecificationExtension} from "./SpecificationExtension";

export interface ExampleObject extends SpecificationExtension {
    summary?: string;
    description?: string;
    value?: unknown;
    externalValue?: string;
}
