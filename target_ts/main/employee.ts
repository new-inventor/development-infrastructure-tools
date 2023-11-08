

export const create = (basePath: string, getAuthToken: () => string) => {
    const paths = {
        create: `${basePath}/employee`,
        get: `${basePath}/employee/{id}`,
        update: `${basePath}/employee/{id}`,
        delete: `${basePath}/employee/{id}`,
    }
    return {
        create: (employee: any) => {
            return fetch(paths.create, {body: employee, method: 'post', headers: {'Authorization': `bearer ${getAuthToken()}`}});
        },
        get: (id: string) => {
            return fetch(paths.get.replace('{id}', id), {method: 'get', headers: {'Authorization': `bearer ${getAuthToken()}`}});
        },
        update: (id: string, employee: any) => {
            return fetch(paths.update.replace('{id}', id), {body: employee, method: 'path', headers: {'Authorization': `bearer ${getAuthToken()}`}});
        },
        delete: (id: string) => {
            return fetch(paths.delete.replace('{id}', id), {method: 'delete', headers: {'Authorization': `bearer ${getAuthToken()}`}});
        },
    }
}
