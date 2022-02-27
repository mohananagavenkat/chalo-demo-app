import './App.css';
import {
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Routes from './pages/Routes';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/routes" element={<Routes />} />
        <Route path="/routes/edit/:id" element={<Routes mode={'edit'} title={'Edit Route'} />} />
        <Route path="/" element={<Home />} />
      </Switch>
    </div>
  );
}

export default App;
