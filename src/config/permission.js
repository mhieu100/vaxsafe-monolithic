export const ALL_PERMISSIONS = {
    CENTERS: {
        GET_PAGINATE: { method: 'GET', apiPath: '/centers', module: 'CENTERS' },
        CREATE: { method: 'POST', apiPath: '/centers', module: 'CENTERS' },
        UPDATE: { method: 'PUT', apiPath: '/centers', module: 'CENTERS' },
        DELETE: { method: 'DELETE', apiPath: '/centers/{id}', module: 'CENTERS' },
    },
    VACCINES: {
        GET_PAGINATE: { method: 'GET', apiPath: '/vaccines', module: 'VACCINES' },
        CREATE: { method: 'POST', apiPath: '/vaccines', module: 'VACCINES' },
        UPDATE: { method: 'PUT', apiPath: '/vaccines', module: 'VACCINES' },
        DELETE: { method: 'DELETE', apiPath: '/vaccines/{id}', module: 'VACCINES' },
    },
    PERMISSIONS: {
        GET_PAGINATE: { method: 'GET', apiPath: '/permissions', module: 'PERMISSIONS' },
        CREATE: { method: 'POST', apiPath: '/permissions', module: 'PERMISSIONS' },
        UPDATE: { method: 'PUT', apiPath: '/permissions', module: 'PERMISSIONS' },
        DELETE: { method: 'DELETE', apiPath: '/permissions/{id}', module: 'PERMISSIONS' },
    },
    USERS: {
        GET_PAGINATE: { method: 'GET', apiPath: '/users', module: 'USERS' },
        CREATE: { method: 'POST', apiPath: '/users', module: 'USERS' },
        UPDATE: { method: 'PUT', apiPath: '/users', module: 'USERS' },
        DELETE: { method: 'DELETE', apiPath: '/users/{id}', module: 'USERS' },
    },
    ROLES: {
        GET_PAGINATE: { method: 'GET', apiPath: '/roles', module: 'ROLES' },
    },
    AUTH: {
        PROFILE: { method: 'GET', apiPath: '/auth/account', module: 'AUTH' },
    }
}

export const ALL_MODULES = {
    CENTERS: 'CENTERS',
    VACCINES: 'VACCINES',
    PERMISSIONS: 'PERMISSIONS',
    USERS: 'USERS',
    ROLES: 'ROLES',
    AUTH: 'AUTH'
}