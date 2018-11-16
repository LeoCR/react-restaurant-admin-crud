import React, { Component } from 'react';
import Header from "./components/Header";
import {Provider} from "react-redux";
import store from "./store";
import AddStrongDish from "./components/add/AddStrongDish";
import AddEntree from "./components/add/AddEntree";
import ShowStrongsDishes from "./components/show/ShowStrongsDishes";
import ShowEntrees from "./components/show/ShowEntrees";
import EditStrongDish from "./components/edit/EditStrongDish";
import EditEntree from "./components/edit/EditEntree";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {getStrongsDishes} from "./actions/strongDishActions";
import {getEntrees} from "./actions/entreeActions";
class App extends Component {
  constructor(props){
      super(props);
      store.dispatch(getEntrees());
      store.dispatch(getStrongsDishes());
  } 
  render() {
    return (
      <Provider store={store}>
          <Router>
            <React.Fragment>
                <Header/>
                <div className="container">
                  <Switch>
                      <Route exact path="/" component={ShowStrongsDishes}/>
                      <Route exact path="/strongs-dishes" component={ShowStrongsDishes}/>
                      <Route exact path="/add/strong-dish" component={AddStrongDish}/>
                      <Route exact path="/edit/strong-dish/:id" component={EditStrongDish}/>

                      <Route exact path="/entrees" component={ShowEntrees}/>
                      <Route exact path="/add/entree" component={AddEntree}/>
                      <Route exact path="/edit/entree/:id" component={EditEntree}/>
                  </Switch>  
                </div>
            </React.Fragment>
          </Router>
      </Provider>
    );
  }
}

export default App;
