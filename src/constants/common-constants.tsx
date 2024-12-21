import { PageInfo } from "@/interfaces/common-interfaces";

export const defaultPageInfo: PageInfo = {
    page: 1,
    size: 20
}

export const tabDescriptions: any = {
    'reports': 'Reporting provides a centralized view of all generated reports, offering insights into scan results, identified vulnerabilities, and their impact on application security.',
    'templates': 'Templates are predefined configurations used for generating detailed reports. They help standardize the reporting structure for various scan types and vulnerabilities across applications.',
    'schedules': 'Schedules enable you to automate scans for applications by setting up recurring or one-time scan tasks, ensuring consistent security monitoring.',
    'approvals': 'Approvals allow you to review and manage vulnerabilities marked as false positives. This tab provides a centralized space for evaluating and approving such findings, ensuring accurate reporting and minimizing unnecessary alerts.',
    'teams': 'Groups of users created to manage and organize applications. Applications can be assigned to teams, allowing streamlined access and management within the team structure.',
    'roles': 'Define a set of permissions and access levels. Roles are assigned to users to determine their capabilities and boundaries within the system, ensuring proper security and functionality.',
    'users': 'Represent individual members with access to the system, similar to other applications. They can be assigned specific roles and permissions based on their responsibilities.',
}

export const scanDescriptions: any = {
    sast: {
        title: "Static Application Security Testing (SAST)",
        description: "A method of analyzing source code or binaries for security vulnerabilities without executing the program. It helps detect issues early in the development lifecycle."
    },
    sca: {
        title: "Software Composition Analysis (SCA)",
        description: "Identifies vulnerabilities in third-party libraries and dependencies used in the application. It ensures compliance with licensing requirements and detects outdated or insecure components."
    },
    dast: {
        title: "Dynamic Application Security Testing (DAST)",
        description: "A technique to identify security vulnerabilities by simulating attacks on a running application. It focuses on finding runtime issues like SQL injection or XSS."
    },
    iac: {
        title: "Infrastructure as Code (IaC) Security",
        description: "Analyzes code used for infrastructure provisioning to detect misconfigurations, insecure settings, and compliance issues before deployment."
    },
    container: {
        title: "Container Security",
        description: "Focuses on securing containerized applications by identifying vulnerabilities in container images, ensuring proper configuration, and detecting runtime threats in containerized environments."
    }
};

export const gitDescription:any={
    git:{
        title:'Git Integration',
        description:'Allows users to onboard Git credentials to securely access code repositories during security scans. This integration enables the scanning tools to analyze source code, detect vulnerabilities, and ensure comprehensive security assessments.'
    }
}

export const aiToolDescription = {
    ai: {
        title: "AI Integrations",
        description: "We use open-source AI tools like ChatGPT, Claude, and AWS Bedrock to generate detailed summaries and recommend code improvements. These tools are specifically utilized for Static Application Security Testing (SAST) and Infrastructure as Code (IaC) to enhance security analysis and provide actionable insights."
    }
};

export const settingsDescriptions = {
    tokens: {
      title: "Tokens for CLI Authorization",
      description: "Tokens are used to securely authenticate and authorize CLI interactions with Guardian. These tokens ensure secure access to the system and facilitate seamless communication between the command line interface and the Guardian platform."
    },
    policies: {
      title: "Policies for Applications",
      description: "Policies allow users to define rules that can be attached to applications. These policies can trigger alerts or break pipelines based on predefined thresholds, enabling better control and monitoring of application security and compliance."
    },
    smtp: {
      title: "SMTP for Email Notifications",
      description: "SMTP settings enable the system to send email notifications. By configuring SMTP, you can ensure that important alerts, reports, and system updates are delivered via email to the relevant recipients."
    }
  };
  