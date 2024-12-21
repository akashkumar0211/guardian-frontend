import { GithubOutlined, GitlabOutlined } from '@ant-design/icons';
export const SMTPInitialState = {
    provider_name: '',
    email: '',
    host: '',
    port: '',
    username: '',
    password: '',
    auth: false,
    start_tls: false,
};

export const policyInitialState = {
    name: '',
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    smtpId: '',
    email: [],
    scanTypes: [],
    sendAlerts: false,
    breakPipeline: false,
    serviceid: [],
    tags: [],
}

export const gitRadioOptions = [
    {
        label: (
            <>
                <GithubOutlined style={{ marginRight: 8 }} /> GitHub
            </>
        ),
        value: 'github',
    },
    {
        label: (
            <>
                <GitlabOutlined style={{ marginRight: 8 }} /> GitLab
            </>
        ),
        value: 'gitlab',
    },
];

export const severityColors:any = {
    "CRITICAL": "#D73027",
    "HIGH": "#FC8D59",
    "MEDIUM": "#FEE08B",
    "LOW": "#88C090",
    "UNKNOWN": "#88879E"
};
