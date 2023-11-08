import {OAuthFlowsObject} from "./OAuthFlowsObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface SecuritySchemeObject extends SpecificationExtension {
    type: 'apiKey' | 'http' | 'mutualTLS' | 'oauth2' | 'openIdConnect';
    description?: string;
    name?: string;
    in?: 'query' | 'header' | 'cookie';
    scheme?: 'Basic' | 'Bearer' | 'Digest' | 'DPoP' | 'HOBA' | 'Mutual' | 'Negotiate' | 'OAuth' | 'SCRAM-SHA-1' | 'SCRAM-SHA-256' | 'vapid' | string;
    bearerFormat?: string;
    flows?: OAuthFlowsObject;
    openIdConnectUrl?: string;
}
