export type ApplicationStatus = "à postuler" | "envoyée" | "entretien" | "refus" | "offre"


export interface Application{
    id: number;
    applicationDate: string;
    jobTitle: string;
    entreprise: string;
    status: ApplicationStatus;
    interviewDate: null | string;

}