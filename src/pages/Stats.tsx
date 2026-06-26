import { useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';
import type { ApplicationStatus } from '../types/application';

export default function Stats() {
  const { applications } = useApplications();

  const results = useMemo(() => {
    const totals = applications.reduce(
      (acc, application) => {
        acc[application.status] = (acc[application.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<ApplicationStatus, number>,
    );
    return totals;
  }, [applications]);

  const responseRate = useMemo(() => {
    const responses = (results['refus'] ?? 0) + (results['offre'] ?? 0);
    return Math.round((responses / applications.length) * 100);
  }, [results, applications.length]);

  return (
    <>
      <h1>Détails</h1>
      <div className="stat-container">
        <p>Nombre total de candidatures : {applications.length}</p>
        {Object.entries(results).map(([status, count]) => (
          <p key={status}>
            {status} : {count} candidature{count < 2 ? '' : 's'}
          </p>
        ))}
        <p>Taux de réponses : {responseRate}%</p>
      </div>
    </>
  );
}
