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
    <div className="modal-container" onClick={handleCancel}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Modification de la candidature</h2>
        <input
          type="text"
          onChange={handleJobNameChange}
          placeholder="Intitulé du poste"
          value={jobName}
        />
        <input
          type="text"
          onChange={handleEntrepriseChange}
          placeholder="Nom de l'entreprise"
          value={entreprise}
        />
        <select
          onChange={handleStatusChange}
          name="status"
          id="status"
          value={status}
        >
          <option value="à postuler">à postuler</option>
          <option value="envoyée">envoyée</option>
          <option value="entretien">entretien</option>
          <option value="refus">refus</option>
          <option value="offre">offre</option>
        </select>
        <div>
          <label htmlFor="applicationDate">Date de la candidature</label>
          <input
            onChange={handleApplicationDateChange}
            type="date"
            name="applicationDate"
            id="applicationDate"
            value={applicationDate}
          />
        </div>
        {status === 'entretien' && (
          <div>
            <label htmlFor="interviewDate">Date de l'entretien</label>
            <input
              onChange={handleInterviewDateChange}
              type="date"
              name="interviewDate"
              id="interviewDate"
              value={interviewDate ? interviewDate : ''}
            />
          </div>
        )}
        <div className="buttons">
          <button onClick={handleCancel}>Annuler</button>
          <button
            disabled={
              jobName === '' || entreprise === '' || applicationDate === ''
            }
            onClick={handleSave}
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}
