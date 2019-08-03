import React from 'react';
import {connect} from "react-redux";
import {getUsers} from "../../actions/userActions";
import User from "../../components/view/user";
import $ from 'jquery';
import { Link } from 'react-router-dom';
class ShowUsers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:3,
            usersToShow:[
                {
                    "id":1,
                    "firstname":"Leonardo",
                    "lastname":"Aranibar",
                    "username":"LeonardoAranibarSanchez",
                    "about":"I am Web Developer",
                    "email":"laranibarsanchez@gmail.com",
                    "password":"NWqJg5p5FCFAIvxTvS",
                    "last_login":"2019-07-21T20:43:01.000Z",
                    "updated_at":null,
                    "created_at":null,
                    "status":"active",
                    "provider":"google",
                    "id_user":""
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
    }
    async componentDidMount(){ 
        await this.props.getUsers();
        const {users}=this.props;
        this.setState({
            totalItems:users.length
        }); 
        var tempTotalPages=Math.ceil(users.length/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });  
        this.setUsersItems();
    }
    componentWillReceiveProps(nextProps) {
        try {
            if(nextProps.match.params.page!==null){
                const {page}=nextProps.match.params;
                if(isNaN(page)===false){
                    this.setState({
                        currentPage:page 
                    });
                    this.getPage(page); 
                    setTimeout(() => {    
                        document.querySelector("#page-item-"+page).classList.add("active");
                    }, 1200);
                }
            }
        } 
        catch (error) {
            console.log('An error occurs in ShowUsers.componentWillReceiveProps(),but don\'t worry about it :) ');
            console.log(error);
        }
    }
    renderUsers=()=>{
        if(this.state.usersToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.usersToShow.map(user=>
                    <User key={user.id} info={user}/> 
                )
            )
        }
    }
    getNextPage=()=>{ 
        try {
            if(this.state.currentPage<this.state.totalPagination.length){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=parseInt(this.state.currentPage)+1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    currentPage:tempCurrentPage,
                    firstItemToShow:tempFirstItemToShow
                });
                this.props.history.push("/admin/users/"+tempCurrentPage)
            }
        } catch (error) {
            console.log("An error occurs in ShowUsers.getNextPage(),but don\'t worry about it :)");
            console.log(error);
        }
    }
    getPrevPage=()=>{
        try {
            if(this.state.currentPage>1){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=parseInt(this.state.currentPage)-1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    firstItemToShow:tempFirstItemToShow,
                    currentPage:tempCurrentPage
                });
                this.props.history.push("/admin/users/"+tempCurrentPage);
            } 
        } catch (error) {
            console.log("An error occurs in ShowUsers.getPrevPage(),but don\'t worry about it :)");
            console.log(error);
        }
    }
    getPage=(index)=>{
        try {
            var tempFirstItemToShow=(index*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            if($('.page-nav').hasClass('active')){
                $('.page-nav').removeClass('active');
            }
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(index+1)+')').addClass('active');
                this.setState({
                    currentPage:index,
                    firstItemToShow:tempFirstItemToShow
                });
                this.setUsersItems(); 
            }, 200);
        } catch (error) {
            console.log('An error occurs in ShowUsers.getPage() , but don\'t worry about it');
            console.log(error);
        }
    }
    setUsersItems=()=>{
        const {users}=this.props;
        var tempUsersToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>users.length){
                    maxItemsLenght=users.length;
                }
                if(users[index].name!==null){
                    tempUsersToShow.push(users[index]);
                }
                this.setState({
                    usersToShow:tempUsersToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs in ShowUsers.setUsersItems(), but don\'t worried about :)');
            console.log(error);
        }
    }
    getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center'}}>
                    <nav id="pagination-bottom">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getPrevPage()}>Previous</a>
                            </li> 
                            {
                                this.state.totalPagination.map((index,key)=> 
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/admin/users/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getNextPage()}>Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
    render(){
        const {users}=this.props;
        if(!users){
            return(
                <div>
                    <p>Loading Data From Database ,please Wait...</p>
                </div>
            )
        }
        return(
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {this.renderUsers()}
                            {this.getPagination()}
                        </ul>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    users:state.users.users
})
export default connect(mapStateToProps,{getUsers})(ShowUsers);