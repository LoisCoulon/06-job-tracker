import { useParams } from 'react-router-dom';
import ApplicationItem from '../components/ApplicationItem';
import { useApplications } from '../context/ApplicationContext';
import { Link } from 'react-router-dom';

export default function ApplicationDetail() {
  const { id } = useParams();
  const { applications, removeApplication } = useApplications();

  const application = applications.find((app) => app.id === Number(id));

  return (
    <>
      <h1>Détail</h1>
      {application === undefined ? (
        <p>Cette candidature n'existe pas</p>
      ) : (
        <ApplicationItem
          key={id}
          application={application}
          removeItem={() => removeApplication(application.id)}
        />
      )}
      <div>
        <Link to={'/'}>Retour</Link>
        <button>Modifier</button>
      </div>
    </>
  );
}
