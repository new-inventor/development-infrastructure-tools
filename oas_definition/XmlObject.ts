import {SpecificationExtension} from "./SpecificationExtension";

export interface XmlObject extends SpecificationExtension {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
}
