import React,{Component} from 'react';
import {Link} from "react-router-dom";
class Header extends Component{
    constructor(props) {
        super(props);
        this.toggleSubmenu=this.toggleSubmenu.bind(this);
    }
    toggleSubmenu(e){
        if(e){
            e.currentTarget.classList.toggle("open");
        }
    }
    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    </div>
                    <div className="collapse navbar-collapse" style={{maxWidth: '800px',float: 'left'}}>
                        <ul className="nav navbar-nav">
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/main-courses" className="dropdown-toggle menu-main-item">Main Courses<span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/admin/add/main-course">Add</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/desserts" className="dropdown-toggle menu-main-item">Desserts<span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/admin/add/dessert">Add</Link>
                                    </li>
                                </ul> 
                            </li>
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/appetizers" className="dropdown-toggle menu-main-item">Appetizers<span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/admin/add/appetizer">Add</Link>
                                    </li>
                                </ul> 
                            </li>
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/ingredients" className="dropdown-toggle menu-main-item">Ingredients<span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/admin/add/ingredient">Add</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/drinks" className="dropdown-toggle menu-main-item">Drinks<span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/admin/add/drink">Add</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/invoices" className="dropdown-toggle menu-main-item">Invoices</Link> 
                            </li>
                            <li className="dropdown" onClick={this.toggleSubmenu}>
                                <Link to="/admin/users" className="dropdown-toggle menu-main-item">Users<span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/admin/add/user">Add</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a href="/logout" style={{float: 'right',color:' #fff',width:' 200px',position:' relative',lineHeight: 3}}>Logout</a>
                </div>
            </nav>
        )
    }
}
export default Header;