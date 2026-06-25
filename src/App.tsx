import './App.css';
import { Route, Routes } from 'react-router-dom';
import ApplicationList from './pages/ApplicationList';
import ApplicationDetail from './pages/ApplicationDetail';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ApplicationList />} />
        <Route path="/application/:id" element={<ApplicationDetail />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  );
}

export default App;
