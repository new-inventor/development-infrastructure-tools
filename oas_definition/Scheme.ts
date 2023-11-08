import {InfoObject} from "./InfoObject";
import {ServerObject} from "./ServerObject";
import {PathItemObject} from "./PathItemObject";
import {ReferenceObject} from "./ReferenceObject";
import {ComponentsObject} from "./ComponentsObject";
import {SecurityRequirementObject} from "./SecurityRequirementObject";
import {TagObject} from "./TagObject";
import {ExternalDocumentationObject} from "./ExternalDocumentationObject";
import {SpecificationExtension} from "./SpecificationExtension";
import {PathsObject} from "./PathsObject";

export interface Scheme extends SpecificationExtension {
    openapi: string;
    info: InfoObject;
    jsonSchemaDialect?: string;
    servers?: ServerObject[];
    paths?: PathsObject;
    webhooks?: Record<string, PathItemObject | ReferenceObject>;
    components?: ComponentsObject;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;
}

const a: Scheme = {
    "openapi": "3.0.0",
    "paths": {
        "/categories": {
            "post": {
                "operationId": "CategoryController_create",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateCategoryDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Category created.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CategoryDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Wrong category fields."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Categories"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "get": {
                "operationId": "CategoryController_findAll",
                "parameters": [
                    {
                        "name": "all",
                        "required": false,
                        "in": "query",
                        "schema": {
                            "type": "boolean"
                        }
                    },
                    {
                        "name": "id",
                        "required": false,
                        "in": "query",
                        "schema": {
                            "type": "boolean"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Category list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/CategoryListItemDTO"
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Categories"
                ]
            }
        },
        "/categories/{id}": {
            "get": {
                "operationId": "CategoryController_findOne",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Category data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CategoryDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    },
                    "404": {
                        "description": "Category not found"
                    }
                },
                "tags": [
                    "Categories"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "patch": {
                "operationId": "CategoryController_update",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateCategoryDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Category data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CategoryDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    },
                    "404": {
                        "description": "Category not found"
                    }
                },
                "tags": [
                    "Categories"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "delete": {
                "operationId": "CategoryController_remove",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Category data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CategoryDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    }
                },
                "tags": [
                    "Categories"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/categories/byUrl/{urlName}": {
            "get": {
                "operationId": "CategoryController_findOneByName",
                "parameters": [
                    {
                        "name": "urlName",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Category data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CategoryListItemDTO"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Category not found"
                    }
                },
                "tags": [
                    "Categories"
                ]
            }
        },
        "/categories/{id}/hard": {
            "delete": {
                "operationId": "CategoryController_removeHard",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Category data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CategoryDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    }
                },
                "tags": [
                    "Categories"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/images": {
            "post": {
                "operationId": "ImageController_upload",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "file": {
                                        "type": "string",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "400": {
                        "description": "Wrong multipart form data."
                    }
                },
                "tags": [
                    "Images"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "get": {
                "operationId": "ImageController_findAll",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Images objects list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ImageDTO"
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Images"
                ]
            }
        },
        "/images/{id}": {
            "get": {
                "operationId": "ImageController_findOne",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Image object.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ImageDTO"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Image not found."
                    }
                },
                "tags": [
                    "Images"
                ]
            },
            "delete": {
                "operationId": "ImageController_remove",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Image object.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ImageDTO"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Image not found."
                    }
                },
                "tags": [
                    "Images"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/images/{id}/path": {
            "get": {
                "operationId": "ImageController_getPath",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Image object.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Image not found."
                    }
                },
                "tags": [
                    "Images"
                ]
            }
        },
        "/images/butch": {
            "post": {
                "operationId": "ImageController_uploadButch",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "files": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "format": "binary"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "400": {
                        "description": "Wrong multipart form data."
                    }
                },
                "tags": [
                    "Images"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "delete": {
                "operationId": "ImageController_removeButch",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Images removed."
                    }
                },
                "tags": [
                    "Images"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/images/butch/find": {
            "post": {
                "operationId": "ImageController_findButch",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Images objects list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ImageDTO"
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Images"
                ]
            }
        },
        "/images/butch/path": {
            "get": {
                "operationId": "ImageController_getButchPath",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Images paths list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": [
                    "Images"
                ]
            }
        },
        "/products": {
            "post": {
                "operationId": "ProductsController_create",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateProductDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Product created.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Wrong product fields."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/products/list": {
            "post": {
                "operationId": "ProductsController_findAllSecure",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ProductListOptionsDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Products list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SecureProductListDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    }
                },
                "tags": [
                    "Products"
                ]
            }
        },
        "/products/list/insecure": {
            "post": {
                "operationId": "ProductsController_findAll",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ProductListOptionsDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Products list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductListDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/products/{id}": {
            "get": {
                "operationId": "ProductsController_findOne",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    },
                    "404": {
                        "description": "Product not found."
                    }
                },
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "patch": {
                "operationId": "ProductsController_update",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateProductDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Product data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    },
                    "404": {
                        "description": "Product not found"
                    }
                },
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "delete": {
                "operationId": "ProductsController_remove",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    }
                },
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/products/byUrl/{urlName}": {
            "get": {
                "operationId": "ProductsController_findOneByUrlName",
                "parameters": [
                    {
                        "name": "urlName",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SecureProductDTO"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    },
                    "404": {
                        "description": "Product not found."
                    }
                },
                "tags": [
                    "Products"
                ]
            }
        },
        "/products/{id}/hard": {
            "delete": {
                "operationId": "ProductsController_removeHard",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad id format"
                    }
                },
                "tags": [
                    "Products"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/products/filterParams": {
            "post": {
                "operationId": "ProductsController_getFilterParams",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FilterParamsDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Filter initial data",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProductFilterParamsDto"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad body params"
                    },
                    "404": {
                        "description": "No filter found"
                    }
                },
                "tags": [
                    "Products"
                ]
            }
        },
        "/favorites/{productId}": {
            "post": {
                "operationId": "FavoritesController_switch",
                "summary": "Switch favorite product",
                "description": "Authorised customer can add or remove product from favorites.You must be authenticated to use this method.",
                "parameters": [
                    {
                        "name": "productId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Favorite product added or removed."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/favorites": {
            "get": {
                "operationId": "FavoritesController_findAll",
                "summary": "Get all favorite marks",
                "description": "You must be authorised as an admin to use this method",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FavoriteListOptionsDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Favorites list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/FavoritesListDTO"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/favorites/for-current": {
            "get": {
                "operationId": "FavoritesController_getForCurrentCustomer",
                "summary": "Get all favorite marks for current authorized customer",
                "description": "You must be authenticated to use this method.",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Favorites list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/FavoritesListDTO"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/favorites/for-current/products": {
            "get": {
                "operationId": "FavoritesController_getFavoriteProducts",
                "summary": "Get all favorite products for current authorized customer",
                "description": "You must be authenticated to use this method. Returns list of products.",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Favorite products list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ProductDTO"
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/favorites/by/customer/{customerId}": {
            "delete": {
                "operationId": "FavoritesController_removeByCustomer",
                "summary": "Remove favorite mark from customer",
                "description": "You must be authorised as an admin to use this method",
                "parameters": [
                    {
                        "name": "customerId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Favorites list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FavoriteDTO"
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/favorites/by/product/{productId}": {
            "delete": {
                "operationId": "FavoritesController_removeByProduct",
                "summary": "Remove all favorite marks from product",
                "description": "You must be authorised as an admin to use this method",
                "parameters": [
                    {
                        "name": "productId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Favorites list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FavoriteDTO"
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/favorites/by/list": {
            "delete": {
                "operationId": "FavoritesController_removeMany",
                "summary": "Remove some favorite marks from products",
                "description": "You must be authorised as an admin to use this method",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/RemoveFavoriteDTO"
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Favorites list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FavoriteDTO"
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Favorites"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/rates": {
            "post": {
                "operationId": "RatesController_create",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateRateDto"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Rates created.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SecureRateDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/rates/list/insecure": {
            "post": {
                "operationId": "RatesController_findAll",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RateListOptionsDTO"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Rates list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RateDTO"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/rates/aggregate/{productId}": {
            "get": {
                "operationId": "RatesController_aggregateForProduct",
                "parameters": [
                    {
                        "name": "productId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Average rate for product.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/AverageRateDto"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    },
                    "404": {
                        "description": "Product not found"
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/rates/{productId}": {
            "get": {
                "operationId": "RatesController_get",
                "parameters": [
                    {
                        "name": "productId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Rates list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SecureRateDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    },
                    "404": {
                        "description": "Product not found"
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "patch": {
                "operationId": "RatesController_update",
                "parameters": [
                    {
                        "name": "productId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateRateDto"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Average rate for product.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SecureRateDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "delete": {
                "operationId": "RatesController_remove",
                "parameters": [
                    {
                        "name": "productId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Rate removed.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RateDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/rates/hard": {
            "delete": {
                "operationId": "RatesController_removeHard",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RemoveRateDto"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Rate removed.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RateDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request format"
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Rates"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/actions": {
            "post": {
                "operationId": "ActionsController_create",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateActionDto"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Created action data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ActionDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid request."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "get": {
                "operationId": "ActionsController_findAllSecure",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Actions  list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/SecureActionDTO"
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ]
            }
        },
        "/actions/insecure": {
            "get": {
                "operationId": "ActionsController_findAll",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Actions  list.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ActionDTO"
                                    }
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/actions/insecure/{id}": {
            "get": {
                "operationId": "ActionsController_findOne",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ActionDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid request."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/actions/{id}": {
            "get": {
                "operationId": "ActionsController_findSecure",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SecureActionDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid request."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ]
            },
            "patch": {
                "operationId": "ActionsController_update",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateActionDto"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Removed action data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ActionDTO"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid request."
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            },
            "delete": {
                "operationId": "ActionsController_remove",
                "summary": "Soft remove action in db by setting remove field to \"true\"",
                "description": "You must be authorised as an admin to use this method",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Removed action data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ActionDTO"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/actions/{id}/hard": {
            "delete": {
                "operationId": "ActionsController_removeHard",
                "summary": "Remove action in db ",
                "description": "You must be authorised as an admin to use this method",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "style": 'simple',
                        "schema": {
                            "format": "uuid",
                            "type": "string"
                        },
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Removed action data.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ActionDTO"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Wrong user permissions."
                    }
                },
                "tags": [
                    "Actions"
                ],
                "security": [
                    {
                        "bearer": []
                    }
                ]
            }
        },
        "/reviews": {
            "post": {
                "operationId": "ReviewsController_create",
                "parameters": [],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateReviewDto"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": ""
                    }
                },
                "tags": [
                    "Reviews"
                ]
            },
            "get": {
                "operationId": "ReviewsController_findAll",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": ""
                    }
                },
                "tags": [
                    "Reviews"
                ]
            }
        },
        "/reviews/{id}": {
            "get": {
                "operationId": "ReviewsController_findOne",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                },
                "tags": [
                    "Reviews"
                ]
            },
            "patch": {
                "operationId": "ReviewsController_update",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateReviewDto"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": ""
                    }
                },
                "tags": [
                    "Reviews"
                ]
            },
            "delete": {
                "operationId": "ReviewsController_remove",
                "parameters": [
                    {
                        "name": "id",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                },
                "tags": [
                    "Reviews"
                ]
            }
        }
    },
    "info": {
        "title": "Test shop catalog microservice",
        "description": "catalog microservice for shop with errors",
        "version": "0.1.0",
        "contact": {}
    },
    "tags": [],
    "servers": [
        {
            "url": "http://catalog:3000",
            "description": "Local dev server"
        },
        {
            "url": "http://localhost:80/api/catalog",
            "description": "Docker server"
        },
        {
            "url": "https://23.111.123.118/api/catalog",
            "description": "Prod server"
        }
    ],
    "components": {
        "securitySchemes": {
            "bearer": {
                "scheme": "bearer",
                "bearerFormat": "JWT",
                "type": "http"
            }
        },
        "schemas": {
            "CreateCategoryDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Name of category"
                    },
                    "urlName": {
                        "type": "string",
                        "description": "Name of category transformed for url like queryEncode"
                    },
                    "imageIds": {
                        "description": "List of images ids",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "required": [
                    "name",
                    "urlName"
                ]
            },
            "CategoryDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "urlName": {
                        "type": "string"
                    },
                    "removed": {
                        "type": "boolean"
                    },
                    "createdAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "updatedAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "images": {
                        "description": "Array of image objects",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "required": [
                    "id",
                    "name",
                    "urlName",
                    "removed",
                    "createdAt",
                    "updatedAt",
                    "images"
                ]
            },
            "CategoryListItemDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "urlName": {
                        "type": "string"
                    },
                    "removed": {
                        "type": "boolean"
                    },
                    "images": {
                        "description": "List of images paths",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "productsCount": {
                        "type": "number"
                    }
                },
                "required": [
                    "name",
                    "urlName",
                    "productsCount"
                ]
            },
            "UpdateCategoryDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Name of category"
                    },
                    "urlName": {
                        "type": "string",
                        "description": "Name of category transformed for url like queryEncode"
                    },
                    "imageIds": {
                        "description": "List of images ids",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                }
            },
            "ImageDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "object id"
                    },
                    "originalName": {
                        "type": "string",
                        "description": "Image original name"
                    },
                    "mimeType": {
                        "type": "string",
                        "description": "Image original name"
                    },
                    "size": {
                        "type": "number",
                        "description": "Image size"
                    },
                    "extension": {
                        "type": "string",
                        "description": "Image extension"
                    },
                    "createdAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "updatedAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    }
                },
                "required": [
                    "id",
                    "originalName",
                    "mimeType",
                    "size",
                    "extension",
                    "createdAt",
                    "updatedAt"
                ]
            },
            "CreateProductDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Product displayed name"
                    },
                    "urlName": {
                        "type": "string",
                        "description": "Product url"
                    },
                    "price": {
                        "type": "number"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "manufacturerCountry": {
                        "type": "string"
                    },
                    "amount": {
                        "type": "number",
                        "description": "Amount of product in the stock"
                    },
                    "pieceSizeUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "cartUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "pieceSize": {
                        "type": "number",
                        "description": "The product price package"
                    },
                    "cartUnitMultiplier": {
                        "type": "number",
                        "description": "In cart amount step"
                    },
                    "new": {
                        "type": "boolean",
                        "description": "Is product new in the stock"
                    },
                    "actionId": {
                        "type": "string",
                        "description": "Action in which product participate"
                    },
                    "categoryId": {
                        "type": "string",
                        "description": "Product category"
                    },
                    "type": {
                        "type": "string",
                        "description": "Another sorting field"
                    },
                    "imageIds": {
                        "description": "List of images ids",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "required": [
                    "name",
                    "urlName",
                    "price",
                    "brand",
                    "manufacturerCountry",
                    "amount",
                    "pieceSizeUnit",
                    "cartUnit",
                    "new",
                    "categoryId",
                    "type"
                ]
            },
            "ProductDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "description": "Product displayed name"
                    },
                    "urlName": {
                        "type": "string",
                        "description": "Product url"
                    },
                    "price": {
                        "type": "number"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "manufacturerCountry": {
                        "type": "string"
                    },
                    "amount": {
                        "type": "number",
                        "description": "Amount of product in the stock"
                    },
                    "pieceSizeUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "cartUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "pieceSize": {
                        "type": "number",
                        "description": "The product price package"
                    },
                    "cartUnitMultiplier": {
                        "type": "number",
                        "description": "In cart amount step"
                    },
                    "new": {
                        "type": "boolean",
                        "description": "Is product new in the stock"
                    },
                    "actionId": {
                        "type": "string",
                        "description": "Action in which product participate"
                    },
                    "categoryId": {
                        "type": "string",
                        "description": "Product category"
                    },
                    "type": {
                        "type": "string",
                        "description": "Another sorting field"
                    },
                    "averageRate": {
                        "description": "List of images ids",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "ratesCount": {
                        "type": "number",
                        "description": "Count of customers that rates this product"
                    },
                    "removed": {
                        "type": "boolean",
                        "description": "Is product soft removed"
                    },
                    "createdAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "updatedAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "images": {
                        "description": "Array of image objects",
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/ImageDTO"
                        }
                    }
                },
                "required": [
                    "id",
                    "name",
                    "urlName",
                    "price",
                    "brand",
                    "manufacturerCountry",
                    "amount",
                    "pieceSizeUnit",
                    "cartUnit",
                    "new",
                    "categoryId",
                    "ratesCount",
                    "removed",
                    "createdAt",
                    "updatedAt",
                    "images"
                ]
            },
            "ChildStringFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "type": "string"
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "lt": {
                        "type": "string"
                    },
                    "lte": {
                        "type": "string"
                    },
                    "gt": {
                        "type": "string"
                    },
                    "gte": {
                        "type": "string"
                    },
                    "contains": {
                        "type": "string"
                    },
                    "startsWith": {
                        "type": "string"
                    },
                    "endsWith": {
                        "type": "string"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildStringFilterDTO"
                    }
                }
            },
            "StringFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "type": "string"
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "lt": {
                        "type": "string"
                    },
                    "lte": {
                        "type": "string"
                    },
                    "gt": {
                        "type": "string"
                    },
                    "gte": {
                        "type": "string"
                    },
                    "contains": {
                        "type": "string"
                    },
                    "startsWith": {
                        "type": "string"
                    },
                    "endsWith": {
                        "type": "string"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildStringFilterDTO"
                    }
                }
            },
            "ChildFloatFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "type": "number"
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        }
                    },
                    "lt": {
                        "type": "number"
                    },
                    "lte": {
                        "type": "number"
                    },
                    "gt": {
                        "type": "number"
                    },
                    "gte": {
                        "type": "number"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildFloatFilterDTO"
                    }
                }
            },
            "FloatFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "type": "number"
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        }
                    },
                    "lt": {
                        "type": "number"
                    },
                    "lte": {
                        "type": "number"
                    },
                    "gt": {
                        "type": "number"
                    },
                    "gte": {
                        "type": "number"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildFloatFilterDTO"
                    }
                }
            },
            "ProductCategoryFilterDTO": {
                "type": "object",
                "properties": {
                    "urlName": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    }
                }
            },
            "ChildStringNullableFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "oneOf": [
                            {
                                "type": "string"
                            },
                            {
                                "type": "null"
                            }
                        ]
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "lt": {
                        "type": "string"
                    },
                    "lte": {
                        "type": "string"
                    },
                    "gt": {
                        "type": "string"
                    },
                    "gte": {
                        "type": "string"
                    },
                    "contains": {
                        "type": "string"
                    },
                    "startsWith": {
                        "type": "string"
                    },
                    "endsWith": {
                        "type": "string"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildStringNullableFilterDTO"
                    }
                }
            },
            "StringNullableFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "oneOf": [
                            {
                                "type": "string"
                            },
                            {
                                "type": "null"
                            }
                        ]
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "lt": {
                        "type": "string"
                    },
                    "lte": {
                        "type": "string"
                    },
                    "gt": {
                        "type": "string"
                    },
                    "gte": {
                        "type": "string"
                    },
                    "contains": {
                        "type": "string"
                    },
                    "startsWith": {
                        "type": "string"
                    },
                    "endsWith": {
                        "type": "string"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildStringNullableFilterDTO"
                    }
                }
            },
            "ProductsFilterDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "name": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "brand": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "manufacturerCountry": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "price": {
                        "$ref": "#/components/schemas/FloatFilterDTO"
                    },
                    "actionId": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "categoryId": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "category": {
                        "$ref": "#/components/schemas/ProductCategoryFilterDTO"
                    },
                    "amount": {
                        "$ref": "#/components/schemas/FloatFilterDTO"
                    },
                    "type": {
                        "$ref": "#/components/schemas/StringNullableFilterDTO"
                    }
                }
            },
            "ProductSortingDTO": {
                "type": "object",
                "properties": {
                    "price": {
                        "enum": [
                            "asc",
                            "desc"
                        ]
                    },
                    "inStock": {
                        "enum": [
                            "asc",
                            "desc"
                        ]
                    },
                    "type": {
                        "enum": [
                            "asc",
                            "desc"
                        ]
                    },
                    "ratesCount": {
                        "enum": [
                            "asc",
                            "desc"
                        ]
                    }
                }
            },
            "PaginationDTO": {
                "type": "object",
                "properties": {
                    "offset": {
                        "type": "number"
                    },
                    "limit": {
                        "type": "number"
                    }
                }
            },
            "ProductListOptionsDTO": {
                "type": "object",
                "properties": {
                    "filter": {
                        "$ref": "#/components/schemas/ProductsFilterDTO"
                    },
                    "sorting": {
                        "$ref": "#/components/schemas/ProductSortingDTO"
                    },
                    "pagination": {
                        "$ref": "#/components/schemas/PaginationDTO"
                    }
                }
            },
            "SecureProductDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "description": "Product displayed name"
                    },
                    "urlName": {
                        "type": "string",
                        "description": "Product url"
                    },
                    "price": {
                        "type": "number"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "manufacturerCountry": {
                        "type": "string"
                    },
                    "amount": {
                        "type": "number",
                        "description": "Amount of product in the stock"
                    },
                    "pieceSizeUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "cartUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "pieceSize": {
                        "type": "number",
                        "description": "The product price package"
                    },
                    "cartUnitMultiplier": {
                        "type": "number",
                        "description": "In cart amount step"
                    },
                    "new": {
                        "type": "boolean",
                        "description": "Is product new in the stock"
                    },
                    "actionId": {
                        "type": "string",
                        "description": "Action in which product participate"
                    },
                    "categoryId": {
                        "type": "string",
                        "description": "Product category"
                    },
                    "type": {
                        "type": "string",
                        "description": "Another sorting field"
                    },
                    "averageRate": {
                        "description": "List of images ids",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "ratesCount": {
                        "type": "number",
                        "description": "Count of customers that rates this product"
                    },
                    "images": {
                        "description": "Array of images paths",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "required": [
                    "id",
                    "name",
                    "urlName",
                    "price",
                    "brand",
                    "manufacturerCountry",
                    "amount",
                    "pieceSizeUnit",
                    "cartUnit",
                    "new",
                    "categoryId",
                    "ratesCount",
                    "images"
                ]
            },
            "SecureProductListDTO": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/SecureProductDTO"
                        }
                    },
                    "count": {
                        "type": "number"
                    },
                    "offset": {
                        "type": "number"
                    },
                    "limit": {
                        "type": "number"
                    }
                },
                "required": [
                    "data",
                    "count",
                    "offset",
                    "limit"
                ]
            },
            "ProductListDTO": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/ProductDTO"
                        }
                    },
                    "count": {
                        "type": "number"
                    },
                    "offset": {
                        "type": "number"
                    },
                    "limit": {
                        "type": "number"
                    }
                },
                "required": [
                    "data",
                    "count",
                    "offset",
                    "limit"
                ]
            },
            "UpdateProductDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Product displayed name"
                    },
                    "urlName": {
                        "type": "string",
                        "description": "Product url"
                    },
                    "price": {
                        "type": "number"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "manufacturerCountry": {
                        "type": "string"
                    },
                    "amount": {
                        "type": "number",
                        "description": "Amount of product in the stock"
                    },
                    "pieceSizeUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "cartUnit": {
                        "enum": [
                            "GR",
                            "KG",
                            "COUNT",
                            "ML",
                            "L"
                        ],
                        "description": "Amount unit GR | KG | COUNT | L | ML"
                    },
                    "pieceSize": {
                        "type": "number",
                        "description": "The product price package"
                    },
                    "cartUnitMultiplier": {
                        "type": "number",
                        "description": "In cart amount step"
                    },
                    "new": {
                        "type": "boolean",
                        "description": "Is product new in the stock"
                    },
                    "actionId": {
                        "type": "string",
                        "description": "Action in which product participate"
                    },
                    "categoryId": {
                        "type": "string",
                        "description": "Product category"
                    },
                    "type": {
                        "type": "string",
                        "description": "Another sorting field"
                    },
                    "imageIds": {
                        "description": "List of images ids",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                }
            },
            "FilterParamsDTO": {
                "type": "object",
                "properties": {
                    "action": {
                        "type": "boolean"
                    },
                    "categoryUrlName": {
                        "type": "string"
                    }
                }
            },
            "ProductFilterParamsDto": {
                "type": "object",
                "properties": {
                    "productsMinPrice": {
                        "type": "number"
                    },
                    "productsMaxPrice": {
                        "type": "number"
                    },
                    "types": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "required": [
                    "productsMinPrice",
                    "productsMaxPrice",
                    "types"
                ]
            },
            "FavoriteFilterDTO": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "productId": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    }
                }
            },
            "FavoriteListOptionsDTO": {
                "type": "object",
                "properties": {
                    "filter": {
                        "$ref": "#/components/schemas/FavoriteFilterDTO"
                    },
                    "pagination": {
                        "$ref": "#/components/schemas/PaginationDTO"
                    }
                }
            },
            "FavoriteDTO": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "type": "string"
                    },
                    "productId": {
                        "type": "string"
                    },
                    "createdAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "updatedAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    }
                },
                "required": [
                    "customerId",
                    "productId",
                    "createdAt",
                    "updatedAt"
                ]
            },
            "FavoritesListDTO": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/FavoriteDTO"
                        }
                    },
                    "count": {
                        "type": "number"
                    },
                    "offset": {
                        "type": "number"
                    },
                    "limit": {
                        "type": "number"
                    }
                },
                "required": [
                    "data",
                    "count",
                    "offset",
                    "limit"
                ]
            },
            "RemoveFavoriteDTO": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    },
                    "customerId": {
                        "type": "string"
                    }
                },
                "required": [
                    "productId",
                    "customerId"
                ]
            },
            "CreateRateDto": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    },
                    "value": {
                        "type": "number",
                        "description": "Customer rate"
                    }
                },
                "required": [
                    "productId",
                    "value"
                ]
            },
            "SecureRateDTO": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    },
                    "customerId": {
                        "type": "string"
                    },
                    "value": {
                        "type": "number",
                        "description": "Customer rate"
                    }
                },
                "required": [
                    "productId",
                    "customerId",
                    "value"
                ]
            },
            "ChildIntFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "type": "number"
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "lt": {
                        "type": "number"
                    },
                    "lte": {
                        "type": "number"
                    },
                    "gt": {
                        "type": "number"
                    },
                    "gte": {
                        "type": "number"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildIntFilterDTO"
                    }
                }
            },
            "IntFilterDTO": {
                "type": "object",
                "properties": {
                    "equals": {
                        "type": "number"
                    },
                    "in": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "notIn": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "lt": {
                        "type": "number"
                    },
                    "lte": {
                        "type": "number"
                    },
                    "gt": {
                        "type": "number"
                    },
                    "gte": {
                        "type": "number"
                    },
                    "not": {
                        "$ref": "#/components/schemas/ChildIntFilterDTO"
                    }
                }
            },
            "RateFilterDTO": {
                "type": "object",
                "properties": {
                    "customerId": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "productId": {
                        "$ref": "#/components/schemas/StringFilterDTO"
                    },
                    "value": {
                        "$ref": "#/components/schemas/IntFilterDTO"
                    }
                }
            },
            "RateSortingDTO": {
                "type": "object",
                "properties": {
                    "value": {
                        "enum": [
                            "asc",
                            "desc"
                        ]
                    }
                }
            },
            "RateListOptionsDTO": {
                "type": "object",
                "properties": {
                    "filter": {
                        "$ref": "#/components/schemas/RateFilterDTO"
                    },
                    "sorting": {
                        "$ref": "#/components/schemas/RateSortingDTO"
                    },
                    "pagination": {
                        "$ref": "#/components/schemas/PaginationDTO"
                    }
                }
            },
            "RateDTO": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    },
                    "customerId": {
                        "type": "string"
                    },
                    "value": {
                        "type": "number",
                        "description": "Customer rate"
                    },
                    "removed": {
                        "type": "boolean",
                        "description": "Is rate soft removed"
                    },
                    "createdAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "updatedAt": {
                        "format": "date-time",
                        "type": "string",
                        "description": "ISO 8601 date string"
                    }
                },
                "required": [
                    "productId",
                    "customerId",
                    "value",
                    "removed",
                    "createdAt",
                    "updatedAt"
                ]
            },
            "AverageRateDto": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "number",
                        "description": "Average customers rate"
                    }
                },
                "required": [
                    "value"
                ]
            },
            "UpdateRateDto": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    },
                    "value": {
                        "type": "number",
                        "description": "Customer rate"
                    }
                },
                "required": [
                    "productId",
                    "value"
                ]
            },
            "RemoveRateDto": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    },
                    "customerId": {
                        "type": "string"
                    }
                },
                "required": [
                    "productId",
                    "customerId"
                ]
            },
            "CreateActionDto": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "enum": [
                            "PERCENTS",
                            "FIXED"
                        ],
                        "description": "type of discount PERCENTS | FIXED"
                    },
                    "value": {
                        "type": "number"
                    }
                },
                "required": [
                    "name",
                    "type",
                    "value"
                ]
            },
            "ActionDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "enum": [
                            "PERCENTS",
                            "FIXED"
                        ],
                        "description": "Amount unit PERCENTS | FIXED"
                    },
                    "value": {
                        "type": "number"
                    },
                    "removed": {
                        "type": "boolean"
                    },
                    "createdAt": {
                        "type": "string",
                        "description": "ISO 8601 date string"
                    },
                    "updatedAt": {
                        "type": "string",
                        "description": "ISO 8601 date string"
                    }
                },
                "required": [
                    "id",
                    "name",
                    "type",
                    "value",
                    "removed",
                    "createdAt",
                    "updatedAt"
                ]
            },
            "SecureActionDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "enum": [
                            "PERCENTS",
                            "FIXED"
                        ],
                        "description": "Amount unit PERCENTS | FIXED"
                    },
                    "value": {
                        "type": "number"
                    }
                },
                "required": [
                    "id",
                    "name",
                    "type",
                    "value"
                ]
            },
            "UpdateActionDto": {
                "type": "object",
                "properties": {
                    "type": {
                        "enum": [
                            "PERCENTS",
                            "FIXED"
                        ],
                        "description": "type of discount PERCENTS | FIXED"
                    },
                    "value": {
                        "type": "number"
                    }
                }
            },
            "CreateReviewDto": {
                "type": "object",
                "properties": {}
            },
            "UpdateReviewDto": {
                "type": "object",
                "properties": {}
            }
        }
    }
}
