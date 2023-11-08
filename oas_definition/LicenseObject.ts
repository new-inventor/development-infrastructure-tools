import {SpecificationExtension} from "./SpecificationExtension";

export interface LicenseObject extends SpecificationExtension {
    name: string;
    identifier?: string; // SPDX expression
    url?: string; // url for file
}
