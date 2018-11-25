import React,{Component} from 'react';
import {Link} from "react-router-dom";
class Header extends Component{
    constructor(props) {
        super(props);
        this.toggleSubmenu=this.toggleSubmenu.bind(this);
    }
    toggleSubmenu(e){
        e.currentTarget.classList.toggle("open");
    }
    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/admin">React Redux CRUD</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                    <ul className="nav navbar-nav">
                        <li className="dropdown" onClick={this.toggleSubmenu}>
                            <Link to="/admin/strongs-dishes" className="dropdown-toggle">Strong's Dishes <span className="caret"></span>
                            </Link>
                            <ul className="dropdown-menu" role="menu">
                                <li>
                                    <Link to="/admin/add/strong-dish">Add</Link>
                                </li>
                                <li>
                                    <Link to="/admin/strongs-dishes">Edit</Link>
                                </li>
                                <li>
                                    <Link to="/admin/strongs-dishes">Delete</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown" onClick={this.toggleSubmenu}>
                            <Link to="/admin/desserts" className="dropdown-toggle">Desserts <span className="caret"></span>
                            </Link>
                            <ul className="dropdown-menu" role="menu">
                                <li>
                                    <Link to="/admin/add/dessert">Add</Link>
                                </li>
                                <li>
                                    <Link to="/admin/desserts">Edit</Link>
                                </li>
                                <li>
                                    <Link to="/admin/desserts">Delete</Link>
                                </li>
                            </ul> 
                        </li>
                        <li className="dropdown" onClick={this.toggleSubmenu}>
                            <Link to="/admin/entrees" className="dropdown-toggle">Entrees <span className="caret"></span>
                            </Link>
                            <ul className="dropdown-menu" role="menu">
                                <li>
                                    <Link to="/admin/add/entree">Add</Link>
                                </li>
                                <li>
                                    <Link to="/admin/entrees">Edit</Link>
                                </li>
                                <li>
                                    <Link to="/admin/entrees">Delete</Link>
                                </li>
                            </ul> 
                        </li>
                        <li className="dropdown" onClick={this.toggleSubmenu}>
                            <Link to="/admin/ingredients" className="dropdown-toggle">Ingredients <span className="caret"></span>
                            </Link>
                            <ul className="dropdown-menu" role="menu">
                                <li>
                                    <Link to="/admin/add/ingredient">Add</Link>
                                </li>
                                <li>
                                    <Link to="/admin/ingredients">Edit</Link>
                                </li>
                                <li>
                                    <Link to="/admin/ingredients">Delete</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    
                    </div>
                </div>
            </nav>
        )
    }
}
export default Header;