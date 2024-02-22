import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModuleTwo from './components/ModuleTwo/ModuleTwo';
import ModuleOne from './components/ModuleOne/ModuleOne';
import ModuleThree from './components/ModuleThree/ModuleThree';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ModuleOne />} />
          <Route exact path="/institution/:id" element={<ModuleTwo />} />
          <Route exact path="/degree/:id" element={<ModuleThree />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
