import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// We will build these actual files in the next step, 
// for now, we will use simple placeholder components.
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddCar from './pages/AddCar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Dashboard</Link>
        <Link to="/add-car" style={{ marginRight: '10px' }}>Add Car</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;