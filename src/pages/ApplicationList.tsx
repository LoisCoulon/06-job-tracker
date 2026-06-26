import { useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationItem from '../components/ApplicationItem';
import { useApplications } from '../context/ApplicationContext';

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
    <div className="min-h-screen bg-[#0e0e10] text-white px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Candidatures
          </h1>
          <button
            onClick={displayForm}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Ajouter une candidature
          </button>
        </div>
        {isCreating && <ApplicationForm onCancel={cancelForm} />}
        <div className="flex flex-col gap-3">
          {applications.map((application) => (
            <ApplicationItem
              key={application.id}
              application={application}
              removeItem={() => removeApplication(application.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
