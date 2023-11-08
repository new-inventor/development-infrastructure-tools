import {SpecificationExtension} from "./SpecificationExtension";

export interface OAuthFlowObject extends SpecificationExtension {
    authorizationUrl: string;
    tokenUrl: string;
    refreshUrl?: string;
    scopes: Record<string, string>;
}
