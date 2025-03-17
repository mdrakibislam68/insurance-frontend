export const API_ENDPOINTS = {
    auth: {
        login: '/auth/login/',
        permissionList: '/auth/user-permissions/',
    },
    users: {
        roles: () => '/roles-permissions/roles/',
        roleOptions: () => '/roles-permissions/roles/role-options',
        roleSingle: (roleId: number) => `/roles-permissions/roles/${roleId}/`,
        role_users: (roleId: number) => `/roles-permissions/roles/${roleId}/role-users/`,
        deleteUser: () => `/roles-permissions/roles/delete-user/`,
        addUserFromAdmin: () => `/auth/create-new-user/`,
        searchUsers: (searchParams: string) => `/auth/search-users/?email=${searchParams}`,
    },
    permissions: {
        permissionsList: () => '/roles-permissions/permissions/permission-list/',
        userPermissionList: (email: string) => `/roles-permissions/permissions/user-permissions/?email=${email}`,
        setUserPermissions: () => `/roles-permissions/permissions/set-user-permissions/`,
        createRolePermission: () => `roles-permissions/roles/`,
    },
}
