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

  function changeDate(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="text-gray-400 hover:text-white text-sm transition-colors mb-8 inline-block"
        >
          ← Retour
        </Link>

        {application === undefined ? (
          <p className="text-gray-400">Cette candidature n'existe pas</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">
                {application.jobTitle}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={displayFormEdition}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => removeApplication(application.id)}
                  className="bg-[#1a1a1f] hover:bg-red-900 border border-[#2a2a2f] text-gray-400 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <div className="bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Entreprise
                </p>
                <p className="text-white">{application.entreprise}</p>
              </div>
              {application.applicationLink && (
                <div className="flex flex-col gap-1">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Lien vers l'offre d'emploi
                  </p>
                  <a
                    href={application.applicationLink}
                    className="text-blue-500"
                  >
                    {application.applicationLink}
                  </a>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Date de candidature
                </p>
                <p className="text-white">
                  {changeDate(application.applicationDate)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Statut
                </p>
                <p className="text-white">{application.status}</p>
              </div>
              {application.interviewDate && (
                <div className="flex flex-col gap-1">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Date d'entretien
                  </p>
                  <p className="text-white">
                    {changeDate(application.interviewDate)}
                  </p>
                </div>
              )}
            </div>

            {isEditing && (
              <EditForm onCancel={cancelEdition} application={application} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
