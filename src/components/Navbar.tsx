import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav>
      <Link className="link" to="/">
        Candidatures
      </Link>
      <Link className="link" to="/stats">
        Statistiques
      </Link>
    </nav>
  );
}
