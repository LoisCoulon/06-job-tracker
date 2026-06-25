import { useNavigate } from 'react-router-dom';
import type { Application } from '../types/application';

interface ApplicationItemProps {
  application: Application;
  removeItem: (id: number) => void;
}

export default function ApplicationItem({
  application,
  removeItem,
}: ApplicationItemProps) {
  const navigate = useNavigate();

  return (
    <div key={application.id} className="application-container">
      <p>Titre : {application.jobTitle}</p>
      <p>Entreprise : {application.entreprise}</p>
      <p>CV envoyé le : {application.applicationDate}</p>
      <p>Statut : {application.status}</p>
      {application.interviewDate && (
        <p>Entretien le : {application.interviewDate}</p>
      )}
      <div className="buttons">
        <button onClick={() => navigate(`/application/${application.id}`)}>
          Voir détail
        </button>
        <button onClick={() => removeItem(application.id)}>Supprimer</button>
      </div>
    </div>
  );
}
