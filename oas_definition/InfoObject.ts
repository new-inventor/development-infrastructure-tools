import {ContactObject} from "./ContactObject";
import {LicenseObject} from "./LicenseObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface InfoObject extends SpecificationExtension {
    title: string;
    summary?: string;
    description?: string;
    termsOfService?: string; // url for the document
    contact?: ContactObject;
    license?: LicenseObject;
    version: string;
}
