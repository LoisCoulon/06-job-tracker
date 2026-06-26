import { useState } from 'react';
import type { Application } from '../types/application';
import { useApplications } from '../context/ApplicationContext';

interface EditFormPops {
  onCancel: () => void;
  application: Application;
}

export default function EditForm({ onCancel, application }: EditFormPops) {
  const { updateApplication } = useApplications();

  const [status, setStatus] = useState<Application['status']>(
    application.status,
  );
  const [jobName, setJobName] = useState<string>(application.jobTitle);
  const [entreprise, setEntreprise] = useState<string>(application.entreprise);
  const [applicationDate, setApplicationDate] = useState<string>(
    application.applicationDate,
  );
  const [interviewDate, setInterviewDate] = useState<string | null>(
    application.interviewDate,
  );

  function handleJobNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setJobName(event.target.value);
  }
  function handleEntrepriseChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEntreprise(event.target.value);
  }
  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value as Application['status']);
  }
  function handleApplicationDateChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setApplicationDate(event.target.value);
  }

  function handleInterviewDateChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInterviewDate(event.target.value);
  }

  function handleSave() {
    const editApp = {
      id: application.id,
      jobTitle: jobName,
      entreprise: entreprise,
      status: status,
      applicationDate: applicationDate,
      interviewDate: status === 'entretien' ? interviewDate : null,
    };
    updateApplication(editApp);
    onCancel();
  }

  function handleCancel() {
    onCancel();
  }
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div
        className="bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg p-6 w-full max-w-md flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white font-semibold text-lg">
          Modifier la candidature
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={jobName}
            onChange={handleJobNameChange}
            placeholder="Intitulé du poste"
            className="bg-[#0e0e10] border border-[#2a2a2f] text-white text-sm rounded-md px-3 py-2 placeholder-gray-600 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={entreprise}
            onChange={handleEntrepriseChange}
            placeholder="Nom de l'entreprise"
            className="bg-[#0e0e10] border border-[#2a2a2f] text-white text-sm rounded-md px-3 py-2 placeholder-gray-600 focus:outline-none focus:border-indigo-500"
          />
          <select
            onChange={handleStatusChange}
            name="status"
            id="status"
            value={status}
            className="bg-[#0e0e10] border border-[#2a2a2f] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="à postuler">À postuler</option>
            <option value="envoyée">Envoyée</option>
            <option value="entretien">Entretien</option>
            <option value="refus">Refus</option>
            <option value="offre">Offre</option>
          </select>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="applicationDate"
              className="text-gray-500 text-xs uppercase tracking-wider"
            >
              Date de la candidature
            </label>
            <input
              value={applicationDate}
              onChange={handleApplicationDateChange}
              type="date"
              name="applicationDate"
              id="applicationDate"
              className="bg-[#0e0e10] border border-[#2a2a2f] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {status === 'entretien' && (
            <div className="flex flex-col gap-1">
              <label
                htmlFor="interviewDate"
                className="text-gray-500 text-xs uppercase tracking-wider"
              >
                Date de l'entretien
              </label>
              <input
                value={interviewDate ? interviewDate : ''}
                onChange={handleInterviewDateChange}
                type="date"
                name="interviewDate"
                id="interviewDate"
                className="bg-[#0e0e10] border border-[#2a2a2f] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white text-sm px-4 py-2 rounded-md transition-colors"
          >
            Annuler
          </button>
          <button
            disabled={
              jobName === '' || entreprise === '' || applicationDate === ''
            }
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
