import { useParams } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EditForm from '../components/EditForm';

export default function ApplicationDetail() {
  const { id } = useParams();
  const { applications, removeApplication } = useApplications();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const application = applications.find((app) => app.id === Number(id));

  function displayFormEdition() {
    setIsEditing(true);
  }

  function cancelEdition() {
    setIsEditing(false);
  }

  return (
    <>
      <h1>Détail</h1>
      {application === undefined ? (
        <p>Cette candidature n'existe pas</p>
      ) : (
        <div className="application-container">
          <p>Titre : {application.jobTitle}</p>
          <p>Entreprise : {application.entreprise}</p>
          <p>CV envoyé le : {application.applicationDate}</p>
          <p>Statut : {application.status}</p>
          {application.interviewDate && (
            <p>Entretien le : {application.interviewDate}</p>
          )}
          <div className="buttons">
            <button onClick={() => removeApplication(application.id)}>
              Supprimer
            </button>
            <button onClick={displayFormEdition}>Modifier</button>
          </div>

          {isEditing && (
            <EditForm onCancel={cancelEdition} application={application} />
          )}
        </div>
      )}

      <Link to={'/'}>Retour</Link>
    </>
  );
}
