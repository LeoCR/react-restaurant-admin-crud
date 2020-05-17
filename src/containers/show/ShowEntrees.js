import React,{Component} from 'react';
import {connect} from "react-redux";
import $ from 'jquery';
import Entree from "../../components/view/entree";
import {getEntrees} from "../../actions/entreeActions";
import { Link } from 'react-router-dom';
class ShowEntrees extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:4,
            entreesToShow:[
                {
                    category: "Sea Food",
                    description: "A little dish with marinated meat ↵such as fish, seafood or both - in citrus dressings.",
                    id: "1ENTR",
                    name: "Ceviche",
                    picture: "/img/entrees/ceviche.png",
                    price: "6.50"
                },
                {
                    category: "Salad",
                    description: "A bed of romaine lettuce, followed ↵by grilled peppers, corn, and shrimp. Then we ↵brighten this salad up with chopped grape tomatoes, a ↵diced avocado, and cucumbers.",
                    id: "2ENTR",
                    name: "Grilled Shrimp Salad",
                    picture: "/img/entrees/grilled-shrimp-salad.png",
                    price: "7.50"
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
    }
    
    async componentDidMount(){
        await this.props.getEntrees();
        const {entrees}=this.props;
        this.setState({
            totalItems:entrees.length
        });
        var tempTotalPages=Math.ceil(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
        this.setEntreesItems();
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
            console.log('An error occurs in ShowEntrees.componentWillReceiveProps(),but dont worry about it :) ');
            console.log(error);
        }
    }
    renderEntrees=()=>{
        if(this.state.entreesToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.entreesToShow.map(entree=>
                    <Entree key={entree.id} info={entree}/> 
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
                this.props.history.push("/admin/appetizers/"+tempCurrentPage);
            }
        } catch (error) {
            console.log("An error occurs in ShowEntrees.getNextPage(),but dont worry about it :)");
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
                this.props.history.push("/admin/appetizers/"+tempCurrentPage); 
            }
        } catch (error) {
            console.log("An error occurs in ShowEntrees.getPrevPage(),but dont worry about it :)");
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
                this.setEntreesItems(); 
            }, 300);
        } catch (error) {
            console.log('An error occurs in ShowEntrees.getPage() , but dont worry about it');
            console.log(error);
        }
    }
    setEntreesItems=()=>{
        const {entrees}=this.props;
        var tempEntreesToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>entrees.length){
                    maxItemsLenght=entrees.length;
                }
                if(entrees[index].name!==null   ){
                    tempEntreesToShow.push(entrees[index]);
                }
                this.setState({
                    entreesToShow:tempEntreesToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs dont worry about');
        }
    }
    getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center'}}>
                    <nav id="pagination-bottom">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getPrevPage()}  href="#previous">Previous</a>
                            </li> 
                            {
                                this.state.totalPagination.map((index,key)=> 
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/admin/appetizers/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getNextPage()} href="#next">Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
    
    render(){
        const {entrees}=this.props;
        if(!entrees){
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
                        {this.renderEntrees()}
                        {this.getPagination()}
                        </ul>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    entrees:state.entrees.entrees
})
export default connect(mapStateToProps,{getEntrees})(ShowEntrees);