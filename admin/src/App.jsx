import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/content/Welcome';

function App() {
  document.title = "TienditaCafe | Proveedores"
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/bienvenido" component={Welcome} />
      </Switch>    
    </Router>
  );
}

export default App;
