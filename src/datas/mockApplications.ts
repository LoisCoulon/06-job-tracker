import type { Application } from "../types/application";

export const mockApplications: Application[] = [

{
    id: 1,
    applicationDate: "2026-06-16",
    jobTitle: "Développeur React",
    entreprise : "Airbus",
    status: "envoyée",
    interviewDate: null,
},
{
    id: 2,
    applicationDate: "2026-06-18",
    jobTitle: "Développeur front end",
    entreprise : "Capgemini",
    status: "entretien",
    interviewDate: "2026-06-27",
},
{
    id: 3,
    applicationDate: "2026-06-19",
    jobTitle: "développeur full stack",
    entreprise : "Cdiscount",
    status: "refus",
    interviewDate: null,
},
{
    id: 4,
    applicationDate: "2026-06-26",
    jobTitle: "Développeur React",
    entreprise : "CS group",
    status: "à postuler",
    interviewDate: null,
},
    
]