import React from 'react';
import Header from "./Header";
import AddStrongDish from "./add/AddStrongDish";
import AddEntree from "./add/AddEntree";
import AddIngredient from "./add/AddIngredient";
import AddDessert from "./add/AddDessert";
import AddDrink from "./add/AddDrink";
import ShowStrongsDishes from "../containers/show/ShowStrongsDishes";
import ShowIngredients from "../containers/show/ShowIngredients";
import ShowEntrees from "../containers/show/ShowEntrees";
import ShowDesserts from "../containers/show/ShowDesserts";
import ShowDrinks from "../containers/show/ShowDrinks";
import ShowInvoices from "../containers/show/ShowInvoices";
import ShowUsers from "../containers/show/ShowUsers";
import EditStrongDish from "./edit/EditStrongDish";
import EditIngredient from "./edit/EditIngredient";
import EditEntree from "./edit/EditEntree";
import EditDessert from "./edit/EditDessert";
import EditDrink from "./edit/EditDrink";
import EditInvoice from "./edit/EditInvoice";
import {Router,Route,Switch} from "react-router-dom";
import history from '../history';
import Modal from "./Modal";
import EditUser from './edit/EditUser';
import AddUser from './add/AddUser';
const App =()=> { 
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
                      <Route exact path="/admin/users" component={ShowUsers}/>
                      <Route exact path="/admin/users/:page" component={ShowUsers}/>
                      <Route exact path="/admin/edit/user/:id" component={EditUser}/>
                      <Route exact path="/admin/add/user" component={AddUser}/>
                      
                      <Route exact path="/admin/main-courses" component={ShowStrongsDishes}/>
                      <Route exact path="/admin/main-courses/:page" component={ShowStrongsDishes}/>
                      <Route exact path="/admin/add/main-course" component={AddStrongDish}/>
                      <Route exact path="/admin/edit/main-course/:id" component={EditStrongDish}/>

                      <Route exact path="/admin/appetizers" render={() => <ShowEntrees/>}/>
                      <Route exact path="/admin/appetizers/:page" component={ShowEntrees}/>
                      <Route exact path="/admin/add/appetizer" component={AddEntree}/>
                      <Route exact path="/admin/edit/appetizer/:id" component={EditEntree}/>

                      <Route exact path="/admin/ingredients" render={() => <ShowIngredients/>} />
                      <Route exact path="/admin/ingredients/:page" component={ShowIngredients} />
                      <Route exact path="/admin/add/ingredient" component={AddIngredient}/>
                      <Route exact path="/admin/edit/ingredient/:id" component={EditIngredient}/>

                      <Route exact path="/admin/desserts" render={() => <ShowDesserts/>}/>
                      <Route exact path="/admin/desserts/:page" component={ShowDesserts}/>
                      <Route exact path="/admin/add/dessert" component={AddDessert}/>
                      <Route exact path="/admin/edit/dessert/:id" component={EditDessert}/>

                      <Route exact path="/admin/drinks" render={() => <ShowDrinks/>}/>
                      <Route exact path="/admin/drinks/:page" component={ShowDrinks}/>
                      <Route exact path="/admin/add/drink" component={AddDrink}/>
                      <Route exact path="/admin/edit/drink/:id" component={EditDrink}/>

                      <Route exact path="/admin/invoices" render={() => <ShowInvoices/>}/>
                      <Route exact path="/admin/invoices/:page" component={ShowInvoices}/>
                      <Route exact path="/admin/edit/invoice/:order_code" component={EditInvoice}/>
                  </Switch>  
                </div>
            </React.Fragment>
          </Router>
          <Modal/>
      </React.Fragment>
    );
} 
export default  React.memo(App);
