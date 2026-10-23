// Fabian's certifications as listed in his consultant resume (October 2026).
export interface Cert {
  name: string;
  year: number;
}

export const architectCerts: Cert[] = [
  { name: 'Data Architect', year: 2020 },
  { name: 'Application Architect', year: 2020 },
  { name: 'Sharing and Visibility Architect', year: 2020 },
  { name: 'Integration Architect', year: 2021 },
  { name: 'Identity and Access Management Architect', year: 2021 },
  { name: 'System Architect', year: 2021 },
  { name: 'Development Lifecycle and Deployment Architect', year: 2021 },
  { name: 'B2B Solution Architect', year: 2023 },
];

export const salesforceCerts: Cert[] = [
  { name: 'Administrator', year: 2018 },
  { name: 'Experience Cloud Consultant', year: 2019 },
  { name: 'Service Cloud Consultant', year: 2019 },
  { name: 'Platform App Builder', year: 2020 },
  { name: 'Sales Cloud Consultant', year: 2020 },
  { name: 'Platform Developer I', year: 2020 },
  { name: 'Advanced Administrator', year: 2020 },
  { name: 'Field Service Consultant', year: 2020 },
  { name: 'Nonprofit Cloud Consultant', year: 2020 },
  { name: 'Business Analyst', year: 2022 },
  { name: 'Platform Developer II', year: 2022 },
  { name: 'Associate', year: 2022 },
  { name: 'Strategy Designer', year: 2023 },
  { name: 'Sales Representative', year: 2025 },
  { name: 'AI Specialist', year: 2025 },
  { name: 'AI Associate', year: 2025 },
  { name: 'Marketing Associate', year: 2025 },
];

// Grouped by the key used for the group title in the i18n files.
export const otherCerts: Record<'architecture' | 'devops' | 'delivery' | 'crm', Cert[]> = {
  architecture: [
    { name: 'iSAQB CPSA-F (Software Architecture)', year: 2019 },
    { name: 'AWS Certified Cloud Practitioner', year: 2021 },
    { name: 'MuleSoft Associate', year: 2025 },
  ],
  devops: [
    { name: 'Copado Certified Fundamentals I', year: 2021 },
    { name: 'Copado Certified Fundamentals II', year: 2021 },
    { name: 'Flosum Certified Professional', year: 2021 },
    { name: 'Flosum Certified Expert', year: 2021 },
    { name: 'Gearset Master', year: 2022 },
  ],
  delivery: [
    { name: 'Professional Scrum Master I (PSM I)', year: 2019 },
    { name: 'PRINCE2 Foundation', year: 2020 },
    { name: 'Six Sigma Yellow Belt', year: 2022 },
    { name: 'Six Sigma Green Belt', year: 2022 },
  ],
  crm: [
    { name: 'HubSpot Sales Software', year: 2025 },
    { name: 'HubSpot Marketing Software', year: 2025 },
    { name: 'HubSpot Service Software', year: 2025 },
  ],
};
