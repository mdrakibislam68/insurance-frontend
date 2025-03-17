export const hasPermission = (
    permissions: string[] | null | undefined,
    childPermissions: string[],
    superuser?: boolean,
) => {
    if (superuser) {
        return true
    }

    return childPermissions.some((permission) =>
        permissions?.includes(permission),
    )
}
