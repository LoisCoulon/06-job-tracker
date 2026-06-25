import ApplicationItem from '../components/ApplicationItem';
import { useApplications } from '../context/ApplicationContext';
import '../styles/applicationlist.css';

export default function ApplicationList() {
  const { applications, removeApplication } = useApplications();

  return (
    <>
      <h1>Liste</h1>
      {applications.map((application) => (
        <ApplicationItem
          application={application}
          removeItem={() => removeApplication(application.id)}
        />
      ))}
    </>
  );
}
