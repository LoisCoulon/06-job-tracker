import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#111111] border-b border-[#2a2a2f] px-6 py-3 flex items-center justify-between">
      <span className="text-white font-semibold text-lg tracking-tight">
        Job tracker
      </span>
      <div className="flex gap-6">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-white text-sm font-medium'
              : 'text-gray-400 text-sm hover:text-white transition-colors'
          }
          to="/"
        >
          Candidatures
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-white text-sm font-medium'
              : 'text-gray-400 text-sm hover:text-white transition-colors'
          }
          to="/stats"
        >
          Statistiques
        </NavLink>
      </div>
    </nav>
  );
}
