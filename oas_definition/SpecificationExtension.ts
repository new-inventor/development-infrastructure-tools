export interface SpecificationExtension {
    [key: `x-oas-${string}`]: never;
    [key: `x-oai-${string}`]: never;
    [key: `x-${string}`]: unknown;
}
