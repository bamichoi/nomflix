import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import Header from "Components/Header";
import Tv from "Routes/Tv";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path={["/", "/movies/:movieId"]} exact component={Home}/>
        <Route path={["/search", "/search/:objectId"]} component={Search}/>
        <Route path={["/tv", "/tv/:tvId"]} component={Tv}/>
      </Switch>
      
    </Router>
  )
  
}

export default App;