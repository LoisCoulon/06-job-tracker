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

  function changeDate(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  function getStatusColor(status: Application['status']) {
    switch (status) {
      case 'à postuler':
        return 'bg-gray-700 text-gray-300';
      case 'envoyée':
        return 'bg-blue-900 text-blue-300';
      case 'entretien':
        return 'bg-yellow-900 text-yellow-300';
      case 'refus':
        return 'bg-red-900 text-red-300';
      case 'offre':
        return 'bg-green-900 text-green-300';
    }
  }

  return (
    <div className="bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg px-5 py-4 flex items-center justify-between hover:border-[#3a3a4f] transition-colors">
      <div className="flex flex-col gap-1">
        <p className="text-white font-medium">Titre : {application.jobTitle}</p>
        <p className="text-gray-400 text-sm">
          Entreprise : {application.entreprise}
        </p>
        <p className="text-gray-500 text-xs">
          CV envoyé le : {changeDate(application.applicationDate)}
        </p>
        {application.interviewDate && (
          <p className="text-gray-500 text-xs">
            Entretien le : {changeDate(application.interviewDate)}
          </p>
        )}
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(application.status)}`}
          >
            Statut : {application.status}
          </span>
          <button
            className="text-gray-400 hover:text-white text-sm transition-colors"
            onClick={() => navigate(`/application/${application.id}`)}
          >
            Voir détail
          </button>
          <button
            className="text-gray-600 hover:text-red-400 text-sm transition-colors"
            onClick={() => removeItem(application.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
