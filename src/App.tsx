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
        <Route path="/" exact component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/tv" component={Tv}/>
      </Switch>
      
    </Router>
  )
  
}

export default App;