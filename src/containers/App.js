import React, { Component } from 'react';
import Header from "../components/Header";
import AddStrongDish from "../components/add/AddStrongDish";
import AddEntree from "../components/add/AddEntree";
import AddIngredient from "../components/add/AddIngredient";
import AddDessert from "../components/add/AddDessert";
import AddDrink from "../components/add/AddDrink";
import ShowStrongsDishes from "./show/ShowStrongsDishes";
import ShowIngredients from "./show/ShowIngredients";
import ShowEntrees from "./show/ShowEntrees";
import ShowDesserts from "./show/ShowDesserts";
import ShowDrinks from "./show/ShowDrinks";
import ShowInvoices from "./show/ShowInvoices";
import EditStrongDish from "../components/edit/EditStrongDish";
import EditIngredient from "../components/edit/EditIngredient";
import EditEntree from "../components/edit/EditEntree";
import EditDessert from "../components/edit/EditDessert";
import EditDrink from "../components/edit/EditDrink";
import EditInvoice from "../components/edit/EditInvoice";
import {Router,Route,Switch} from "react-router-dom";
import history from '../history';
class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router history={history}>
            <React.Fragment>
                <Header/>
                <div className="container">
                  <Switch>
                      <Route exact path="/admin/" 
                      render={() => <ShowStrongsDishes/>}
                      />
                      <Route exact path="/admin/strongs-dishes" render={() => <ShowStrongsDishes/>}/>
                      <Route exact path="/admin/add/strong-dish" component={AddStrongDish}/>
                      <Route exact path="/admin/edit/strong-dish/:id" component={EditStrongDish}/>

                      <Route exact path="/admin/entrees" render={() => <ShowEntrees/>}/>
                      <Route exact path="/admin/add/entree" component={AddEntree}/>
                      <Route exact path="/admin/edit/entree/:id" component={EditEntree}/>

                      <Route exact path="/admin/ingredients" render={() => <ShowIngredients/>} />
                      <Route exact path="/admin/add/ingredient" component={AddIngredient}/>
                      <Route exact path="/admin/edit/ingredient/:id" component={EditIngredient}/>

                      <Route exact path="/admin/desserts" render={() => <ShowDesserts/>}/>
                      <Route exact path="/admin/add/dessert" component={AddDessert}/>
                      <Route exact path="/admin/edit/dessert/:id" component={EditDessert}/>

                      <Route exact path="/admin/drinks" render={() => <ShowDrinks/>}/>
                      <Route exact path="/admin/add/drink" component={AddDrink}/>
                      <Route exact path="/admin/edit/drink/:id" component={EditDrink}/>

                      <Route exact path="/admin/invoices" render={() => <ShowInvoices/>}/>
                      <Route exact path="/admin/edit/invoice/:orderCode" component={EditInvoice}/>
                  </Switch>  
                </div>
            </React.Fragment>
          </Router>
      </React.Fragment>
    );
  }
}

export default App
