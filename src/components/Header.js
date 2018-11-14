import React,{Component} from 'react';
import {Link} from "react-router-dom";
class Header extends Component{
    constructor(props) {
        super(props);
        this.toggleSubmenu=this.toggleSubmenu.bind(this);
    }
    toggleSubmenu(e){
        var dropDown=e.currentTarget;
        dropDown.classList.toggle("open");
    }
    componentDidMount(){
        var dropdown= document.querySelector(".dropdown");
        dropdown.addEventListener("click",this.toggleSubmenu);
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
                    <Link className="navbar-brand" to="/">React Redux</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                    <ul className="nav navbar-nav">
                        
                        <li className="dropdown">
                            <Link to="/strong-dish" className="dropdown-toggle">Strong's Dishes <span className="caret"></span>
                            </Link>
                            <ul className="dropdown-menu" role="menu">
                                <li>
                                    <Link to="/add/strong-dish">Add</Link>
                                </li>
                                <li>
                                    <Link to="/strong-dish">Edit</Link>
                                </li>
                                <li>
                                    <Link to="/strong-dish">Delete</Link>
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