import {SpecificationExtension} from "./SpecificationExtension";

export interface ContactObject extends SpecificationExtension {
    name?: string;
    url?: string;
    email?: string;
}
