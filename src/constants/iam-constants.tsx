export const permissonColors:any={
    "Org Admin":"#2B7873",
    "Org Reader"	:"#4C87E6",
    "Team Admin"	:"#FFB74D",
    "Team Reader"	:"#9C27B0",
    "New User":	"#607D8B"
}

export const ROLES_PERMISSIONS:any = {
    'Org Admin':{
        description: 'Highest level of system access with complete organizational control',
        permissions: [
            'Create and manage users across the entire organization',
            'Modify system-wide permissions and roles',
            'Access and generate comprehensive organizational reports',
            'Configure global system settings',
            'Manage security policies and access controls'
        ]
    },
    'Team Admin':{
        description: 'Full administrative access within a specific team',
        permissions: [
            'Manage team members and their roles',
            'Create and modify team-specific content',
            'Generate team performance reports',
            'Configure team settings and workflows',
            'Assign team-level permissions'
        ]
    },
    'Org Reader':{
        description: 'Read-only access to organizational resources and information',
        permissions: [
            'View all organizational content',
            'Access organizational dashboards',
            'Generate read-only reports',
            'Monitor system-wide metrics',
            'Inspect user activities and logs'
        ]
    },
    'Team Reader':{
        description: 'Read-only access limited to specific team resources',
        permissions: [
            'View team dashboard and metrics',
            'Access team-specific content',
            'Generate team performance insights',
            'Monitor team activities',
            'Review team member contributions'
        ]
    },
    'New User':{
        description: 'Minimal access for newly onboarded members',
        permissions: [
            'Limited profile access',
            'Basic onboarding information',
            'Initial training resources',
            'Restricted system visibility',
            'Pending role assignment'
        ]
    }
}
