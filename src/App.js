import React, { Component } from 'react';
import Header from "./components/Header";
import {Provider} from "react-redux";
import store from "./store";
import AddStrongDish from "./components/add/AddStrongDish";
import AddEntree from "./components/add/AddEntree";
import AddIngredient from "./components/add/AddIngredient";
import AddDessert from "./components/add/AddDessert";
import ShowStrongsDishes from "./components/show/ShowStrongsDishes";
import ShowIngredients from "./components/show/ShowIngredients";
import ShowEntrees from "./components/show/ShowEntrees";
import ShowDesserts from "./components/show/ShowDesserts";
import EditStrongDish from "./components/edit/EditStrongDish";
import EditIngredient from "./components/edit/EditIngredient";
import EditEntree from "./components/edit/EditEntree";
import EditDessert from "./components/edit/EditDessert";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {getStrongsDishes} from "./actions/strongDishActions";
import {getEntrees} from "./actions/entreeActions";
import {getDesserts} from "./actions/dessertActions";
import {getIngredients} from "./actions/ingredientActions";
class App extends Component {
  constructor(props){
      super(props);
      store.dispatch(getEntrees());
      store.dispatch(getStrongsDishes());
      store.dispatch(getIngredients());
      store.dispatch(getDesserts());
  } 
  render() {
    return (
      <Provider store={store}>
          <Router>
            <React.Fragment>
                <Header/>
                <div className="container">
                  <Switch>
                      <Route exact path="/admin/" component={ShowStrongsDishes}/>
                      <Route exact path="/admin/strongs-dishes" component={ShowStrongsDishes}/>
                      <Route exact path="/admin/add/strong-dish" component={AddStrongDish}/>
                      <Route exact path="/admin/edit/strong-dish/:id" component={EditStrongDish}/>

                      <Route exact path="/admin/entrees" component={ShowEntrees}/>
                      <Route exact path="/admin/add/entree" component={AddEntree}/>
                      <Route exact path="/admin/edit/entree/:id" component={EditEntree}/>

                      <Route exact path="/admin/ingredients" component={ShowIngredients}/>
                      <Route exact path="/admin/add/ingredient" component={AddIngredient}/>
                      <Route exact path="/admin/edit/ingredient/:id" component={EditIngredient}/>

                      <Route exact path="/admin/desserts" component={ShowDesserts}/>
                      <Route exact path="/admin/add/dessert" component={AddDessert}/>
                      <Route exact path="/admin/edit/dessert/:id" component={EditDessert}/>
                  </Switch>  
                </div>
            </React.Fragment>
          </Router>
      </Provider>
    );
  }
}

export default App;
