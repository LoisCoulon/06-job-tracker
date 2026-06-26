import { createContext, useState, useContext, useEffect } from 'react';
import type { Application } from '../types/application';
import { mockApplications } from '../datas/mockApplications';

interface ApplicationContextType {
  applications: Application[];
  addApplication: (newApp: Omit<Application, 'id'>) => void;
  removeApplication: (id: number) => void;
  updateApplication: (updateApp: Application) => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

interface ApplicationProviderProps {
  children: React.ReactNode;
}

export default function ApplicationProvider({
  children,
}: ApplicationProviderProps) {
  const stored = localStorage.getItem('applications');
  const [applications, setApplications] = useState<Application[]>(
    stored !== null ? JSON.parse(stored) : mockApplications,
  );

  function addApplication(newApp: Omit<Application, 'id'>) {
    const appWithId: Application = { ...newApp, id: Date.now() };
    setApplications([...applications, appWithId]);
  }

  function removeApplication(id: number) {
    setApplications(applications.filter((app) => app.id !== id));
  }

  function updateApplication(updateApp: Application) {
    setApplications(
      applications.map((app) => (app.id === updateApp.id ? updateApp : app)),
    );
  }

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        removeApplication,
        updateApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (context === null) {
    throw new Error(
      'useApplications doit être utilisé dans un ApplicationProvider',
    );
  }
  return context;
}
