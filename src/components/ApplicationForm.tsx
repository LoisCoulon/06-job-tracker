import { useState } from 'react';
import { useApplications } from '../context/ApplicationContext';
import type { Application } from '../types/application';
import '../styles/applicationform.css';

interface ApplicationFormProps {
  onCancel: () => void;
}

export default function ApplicationForm({ onCancel }: ApplicationFormProps) {
  const { addApplication } = useApplications();
  const [status, setStatus] = useState<Application['status']>('à postuler');
  const [jobName, setJobName] = useState<string>('');
  const [entreprise, setEntreprise] = useState<string>('');
  const [applicationDate, setApplicationDate] = useState<string>('');
  const [interviewDate, setInterviewDate] = useState<string>('');

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
    const newApp: Omit<Application, 'id'> = {
      jobTitle: jobName,
      entreprise: entreprise,
      status: status,
      applicationDate: applicationDate,
      interviewDate: status === 'entretien' ? interviewDate : null,
    };
    addApplication(newApp);
    onCancel();
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div className="modal-container" onClick={handleCancel}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Nouvelle candidature</h2>
        <input
          type="text"
          onChange={handleJobNameChange}
          placeholder="Intitulé du poste"
        />
        <input
          type="text"
          onChange={handleEntrepriseChange}
          placeholder="Nom de l'entreprise"
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
            Enregistrer la nouvelle candidature
          </button>
        </div>
      </div>
    </div>
  );
}
