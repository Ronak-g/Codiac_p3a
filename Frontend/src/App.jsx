import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;