import React, { Component } from 'react';
import Header from "./components/Header";
import {Provider} from "react-redux";
import store from "./store";
import AddStrongDish from "./components/add/AddStrongDish";
import ShowStrongsDishes from "./components/show/ShowStrongsDishes";
import EditStrongDish from "./components/edit/EditStrongDish";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {getStrongsDishes} from "./actions/strongDishActions";

class App extends Component {
  constructor(props){
      super(props);
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
                      <Route exact path="/strong-dish" component={ShowStrongsDishes}/>
                      <Route exact path="/add/strong-dish" component={AddStrongDish}/>
                      <Route exact path="/edit/strong-dish/:id" component={EditStrongDish}/>
                  </Switch>  
                </div>
            </React.Fragment>
          </Router>
      </Provider>
    );
  }
}

export default App;
