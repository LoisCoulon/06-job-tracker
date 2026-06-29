import type { Application } from '../types/application';

export const mockApplications: Application[] = [
  {
    id: 1,
    applicationDate: '2026-06-16',
    jobTitle: 'Développeur React',
    entreprise: 'Airbus',
    status: 'envoyée',
    interviewDate: null,
    applicationLink: null,
  },
  {
    id: 2,
    applicationDate: '2026-06-18',
    jobTitle: 'Développeur front end',
    entreprise: 'Capgemini',
    status: 'entretien',
    interviewDate: '2026-06-27',
    applicationLink: null,
  },
  {
    id: 3,
    applicationDate: '2026-06-19',
    jobTitle: 'développeur full stack',
    entreprise: 'Cdiscount',
    status: 'refus',
    interviewDate: null,
    applicationLink: 'https://www.cdiscount.com/',
  },
  {
    id: 4,
    applicationDate: '2026-06-26',
    jobTitle: 'Développeur React',
    entreprise: 'CS group',
    status: 'à postuler',
    interviewDate: null,
    applicationLink: 'https://www.cs-soprasteria.com/fr/',
  },
];
