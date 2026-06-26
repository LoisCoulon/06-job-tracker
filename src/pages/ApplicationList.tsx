import { useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationItem from '../components/ApplicationItem';
import { useApplications } from '../context/ApplicationContext';
import '../styles/applicationlist.css';

export default function ApplicationList() {
  const { applications, removeApplication } = useApplications();
  const [isCreating, setIsCreating] = useState<boolean>(false);

  function displayForm() {
    setIsCreating(true);
  }

  function cancelForm() {
    setIsCreating(false);
  }

  return (
    <>
      <h1>Liste</h1>
      <button onClick={displayForm}>Ajouter une candidature</button>
      {isCreating && <ApplicationForm onCancel={cancelForm} />}
      {applications.map((application) => (
        <ApplicationItem
          key={application.id}
          application={application}
          removeItem={() => removeApplication(application.id)}
        />
      ))}
    </>
  );
}
