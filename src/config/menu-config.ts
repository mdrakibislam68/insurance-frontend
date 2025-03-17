import {
    Analytics01Icon,
    CourseIcon,
    GraduateMaleIcon,
    Home01Icon,
    NotificationSquareIcon,
    SearchCircleIcon,
    Settings01Icon,
    ShieldUserIcon,
    UserCircleIcon,
    UserListIcon,
    UserMultiple02Icon,
} from '@hugeicons/core-free-icons'
import { PERMISSIONS } from '@/config/permissions'

export const menuConfig = {
    dashboardMenu: [
        {
            key: 'analytics',
            label: 'Analytics',
            type: 'group',
            children: [
                {
                    key: 'dashboard',
                    label: 'Dashboard',
                    icon: Home01Icon,
                    permissions: [],
                },
                {
                    key: 'dashboard/report',
                    label: 'Report',
                    icon: Analytics01Icon,
                    permissions: [],
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'management',
            label: 'Management',
            type: 'group',
            children: [
                {
                    key: 'dashboard/management/trainers',
                    label: 'Trainers',
                    icon: UserListIcon,
                    permissions: [],
                },
                {
                    key: 'dashboard/management/courses',
                    label: 'Courses',
                    icon: CourseIcon,
                    permissions: [],
                },
                {
                    key: 'dashboard/management/exam',
                    label: 'Exam',
                    icon: SearchCircleIcon,
                    permissions: [],
                },
                {
                    key: 'dashboard/management/students',
                    label: 'Students',
                    icon: GraduateMaleIcon,
                    permissions: [],
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'user&system',
            label: 'User & System',
            type: 'group',
            children: [
                {
                    key: 'dashboard/system/users',
                    label: 'Users',
                    icon: UserMultiple02Icon,
                    permissions: [],
                },
                {
                    key: 'dashboard/system/roles-and-permissions',
                    label: 'Roles & Permissions',
                    icon: ShieldUserIcon,
                    permissions: [PERMISSIONS.VIEW_PROCESSES],
                },
                {
                    key: 'dashboard/system/notification',
                    label: 'Notification',
                    icon: NotificationSquareIcon,
                    permissions: [],
                },
                {
                    key: 'dashboard/system/profile',
                    label: 'Profile',
                    icon: UserCircleIcon,
                    permissions: [],
                },
                {
                    key: 'dashboard/system/settings',
                    label: 'Settings',
                    icon: Settings01Icon,
                    permissions: [],
                },
            ],
        },

    ],
    dashboardMenuBottom: [
        {
            type: 'divider',
        },
        {
            key: 'analytics',
            label: 'Analytics',
            icon: Analytics01Icon,
        },

    ],
}

