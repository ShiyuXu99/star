import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateNote from "./component/createNote";
import Home from './component/Home';
import SignIn from "./component/signIn";


function App() {
  return (
    <div className="App">
        <Router>
        <div>
          <Route path="/star" exact component={SignIn}/>
          <Route path="/Home" component={Home}/>
          <Route path="/CreateNote" component={CreateNote}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
