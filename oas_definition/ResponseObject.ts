import {ReferenceObject} from "./ReferenceObject";
import {MediaTypeObject} from "./MediaTypeObject";
import {HeaderObject} from "./HeaderObject";
import {LinkObject} from "./LinkObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface ResponseObject extends SpecificationExtension {
    description: string;
    headers?: Record<string, HeaderObject | ReferenceObject>;
    content?: Record<string, MediaTypeObject>;
    links?: Record<string, LinkObject | ReferenceObject>;
}
