import {ReferenceObject} from "./ReferenceObject";
import {HeaderObject} from "./HeaderObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface EncodingObject extends SpecificationExtension {
    contentType?: string;
    headers?: Record<string, HeaderObject | ReferenceObject>;
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
}
