import { Option } from "@/interfaces/common-interfaces";
import { KeyValuePair, ScanTypeKey } from "@/interfaces/reporting-interface";

export const radioOptions:Option[] = [
    { label: "Applications", value: "service_ids" },
    { label: "Tags", value: "tags" },
  ];


// Scan Types Array
export const scanTypes: KeyValuePair[] = [
  { key: 'SAST', value: 'sast' },
  { key: 'SCA', value: 'sca' },
  { key: 'IAC', value: 'iac' },
  { key: 'Container', value: 'container' }
];

// Severity Levels Array
export const severity: KeyValuePair[] = [
  { key: 'High', value: 'high' },
  { key: 'Medium', value: 'medium' },
  { key: 'Low', value: 'low' },
  { key: 'Critical', value: 'critical' },
  { key: 'Unknown', value: 'unknown' }
];

// Status Array
export const status: KeyValuePair[] = [
  { key: 'Open', value: 'open' },
  { key: 'Closed', value: 'closed' },
  { key: 'Resolved', value: 'resolved' },
  { key: 'FalsePositive', value: 'falsepositive' }
];

// Scan Type Keys Object with Strong Typing
export const scanTypeKeys = {
  sast: [
      { label: 'Commit ID', value: 'commitid' },
      { label: 'Author', value: 'author' },
      { label: 'Description', value: 'description' }
  ] as ScanTypeKey[],
  sca: [
      { label: 'CVSS Score', value: 'cvssscore' },
      { label: 'Description', value: 'description' },
      { label: 'References', value: 'references' },
      { label: 'Fixed In', value: 'fixedin' },
      { label: 'Language', value: 'language' },
      { label: 'Package Manager', value: 'packagemanager' }
  ] as ScanTypeKey[],
  container: [
      { label: 'Description', value: 'description' },
      { label: 'References', value: 'references' },
      { label: 'Checktype', value: 'checktype' },
      { label: 'Type', value: 'type' }
  ] as ScanTypeKey[],
  iac: [
      { label: 'Description', value: 'description' },
      { label: 'References', value: 'references' },
      { label: 'Checktype', value: 'checktype' },
      { label: 'Type', value: 'type' }
  ] as ScanTypeKey[]
};

export const defaultFiltersState={
  severity: [] as string[],
  status: [] as string[],
  scan_type: [] as string[]
}

export const defaultDisplayState={
  severity: false,
  status: false,
  scan_type: false
}

export const defaultScheduleForm={
  type: 'applications',
  name: '',
  template_id: [],
  applications: [],
  tags: [],
  emails: [],
  smtp_id: null,
  start_date: null,
  end_date: null,
  frequency: 'daily',
  time: null,
  day: null,
  month: null
}
