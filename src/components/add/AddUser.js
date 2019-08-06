import React from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addUser,getUsers} from "../../actions/userActions";
class AddUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:0,
            firstname:'',
            lastname:'',
            username:'',
            about:'',
            email:'',
            password:'',
            retypePassword:'',
            error:false,
        }
    }
    componentDidMount=async()=>{
        var idUser=0,totalOfItems=0,_this=this;
        await api.get('/api/count-users')
            .then(response => {
                totalOfItems=response.data.MaxIdUser;
                console.log(totalOfItems);
                
            }).then(()=>{
                idUser=parseInt(totalOfItems)+1;//console.log(idString); 
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            _this.setState({
                id:idUser
            });
            console.log('this.state.id '+this.state.id);
        }, 300);
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    firstnameUser=(e)=>{
        this.setState({
            firstname:e.target.value
        });
    }
    lastnameUser=(e)=>{
        this.setState({
            lastname:e.target.value
        });
    }
    usernameUser=(e)=>{
        this.setState({
            username:e.target.value
        });
    }
    aboutUser=(e)=>{
        this.setState({
            about:e.target.value
        });
    }
    emailUser=(e)=>{
        this.setState({
            email:e.target.value
        });
    }
    passwordUser=(e)=>{
        this.setState({
            password:e.target.value
        });
    }
    retypePasswordUser=(e)=>{
        this.setState({
            retypePassword:e.target.value
        });
    }
    submitAddUser=(e)=>{
        e.preventDefault();
        const {
            id,
            firstname,
            lastname,
            username,
            about,
            email,
            password,
            retypePassword
        }=this.state;
        var _this=this;
        if(username===''||firstname===''||email===''||password===''||username===''||lastname===''
            || password!==retypePassword){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            const infoUser={
                id,
                firstname,
                lastname,
                username,
                about,
                email,
                password
            }
            this.props.addUser(infoUser);
            this.props.getUsers();
            setTimeout(() => {
                _this.props.history.push('/admin/users/');
            },900);
        }
    }
    render(){
        const { error,id,password,retypePassword}=this.state;
        var errorMessage=<div className="font-weight-bold alert-danger text-center mt-4">
            All the fields are required except About
        </div>;
        if(password!==retypePassword){
            errorMessage=<div className="font-weight-bold alert-danger text-center mt-4">
            All the fields are required except About<br/>
            The password Should be the same in Re-type Password Field
            </div>;
        }
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New User</h2>
                            <form onSubmit={this.submitAddUser} id="form-entree-update" >
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" defaultValue={id} 
                                    onChange={this.id}  style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" onChange={this.firstnameUser} 
                                    className="form-control" placeholder="First Name"
                                    name="firstname"
                                     />
                                </div>
                                <div className="form-group">
                                    <label style={{width:'100%'}}>Last Name</label> 
                                    <input type="text" className="form-control"
                                    onChange={this.lastnameUser} placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control"
                                     name="username" id="username" placeholder="Username" onChange={this.usernameUser}/>
                                </div>
                                <div className="form-group">
                                    <label>About</label>
                                    <input type="text"  
                                    onChange={this.aboutUser} className="form-control"
                                     placeholder="About Me" 
                                     name="about"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" onChange={this.emailUser} 
                                    className="form-control"
                                     placeholder="Email" 
                                     name="email"
                                     />
                                </div> 
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" 
                                    onChange={this.passwordUser} 
                                    className="form-control"
                                     placeholder="Password" 
                                     name="password"
                                     />
                                </div> 
                                <div className="form-group">
                                    <label>Re-type Password</label>
                                    <input type="password" 
                                    onChange={this.retypePasswordUser} 
                                    className="form-control"
                                     placeholder="Password" 
                                     name="password"
                                     />
                                </div>
                            {error ? 
                            errorMessage
                            :''
                            }
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    users:state.users.users
})
export default connect(mapStateToProps,{addUser,getUsers})(AddUser);