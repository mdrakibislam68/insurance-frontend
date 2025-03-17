export const PERMISSIONS = {
    CREATE_PROCESSES: 'processes.api_read_processes',
    VIEW_PROCESSES: 'processes.api_read_processes',
    EDIT_PROCESSES: 'processes.api_edit_processes',
    DELETE_PROCESSES: 'processes.api_delete_processes',
}


export const PROTECTED_ROUTES: Record<string, string[]> = {
    // '/dashboard/system/roles-and-permissions': [PERMISSIONS.VIEW_PROCESSES],
}
