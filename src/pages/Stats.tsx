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
    <div className="min-h-screen bg-[#0e0e10] text-white px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-8">
          Statistiques
        </h1>

        <div className="flex flex-col gap-4">
          <div className="bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg p-6">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Total
            </p>
            <p className="text-3xl font-semibold">{applications.length}</p>
            <p className="text-gray-400 text-sm mt-1">
              candidature{applications.length < 2 ? '' : 's'}
            </p>
          </div>

          <div className="bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg p-6">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-4">
              Par statut
            </p>
            <div className="flex flex-col gap-3">
              {Object.entries(results).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <p className="text-gray-300 text-sm">{status}</p>
                  <p className="text-white font-medium">
                    {count} candidature{count < 2 ? '' : 's'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg p-6">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Taux de réponse
            </p>
            <p className="text-3xl font-semibold">{responseRate}%</p>
            <p className="text-gray-400 text-sm mt-1">
              des candidatures ont reçu une réponse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
