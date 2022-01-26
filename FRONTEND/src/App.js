
import TopBar from "./components/topbar/TopBar";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import List from "./pages/list/List";
import Listupdate from "./pages/listupdate/Listupdate";
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const { user } = useContext(Context);
  //console.log(user);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/register">{user ? <List /> : <Register />}</Route>
        <Route path="/login">{user ? <Redirect to="/"/> : <Login />}</Route>
        <Route path="/update/:updateid">
          <Listupdate/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;