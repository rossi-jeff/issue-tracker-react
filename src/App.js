import "./App.css";
import NavBar from "./components/NavBar";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Projects from "./pages/Projects";
import DashBoard from "./pages/DashBoard";
import Users from "./pages/Users";
import TimeClock from "./pages/TimeClock";
import Profile from "./pages/Profile";
import UserDetail from "./pages/UserDetail";
import IssueDetail from "./pages/IssueDetail";
import ProjectDetail from "./pages/ProjectDetail";
import TimeClockDetail from "./pages/TimeClockDetail";
import IssueNew from "./pages/IssueNew";
import UserNew from "./pages/UserNew";
import ProjectNew from "./pages/ProjectNew";
import TimeClockNew from "./pages/TimeClockNew";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/issues" component={Issues} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/timeclock" component={TimeClock} />
          <Route exact path="/issues/new" component={IssueNew} />
          <Route exact path="/users/new" component={UserNew} />
          <Route exact path="/projects/new" component={ProjectNew} />
          <Route exact path="/timeclock/new" component={TimeClockNew} />
          <Route exact path="/profile/:uuid" component={Profile} />
          <Route exact path="/users/:uuid" component={UserDetail} />
          <Route exact path="/issues/:uuid" component={IssueDetail} />
          <Route exact path="/projects/:uuid" component={ProjectDetail} />
          <Route exact path="/timeclock/:uuid" component={TimeClockDetail} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
