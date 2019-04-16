import React,{Component} from 'react';
import {connect} from "react-redux";
import $ from 'jquery';
import Entree from "../../components/view/entree";
import {getEntrees} from "../../actions/entreeActions"
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
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
    }
    async componentDidMount(){
        await this.props.getEntrees();
        console.log(this.props);
        const {entrees}=this.props;
        this.setState({
            totalItems:entrees.length
        });
        this.setEntreesItems();
        var tempTotalPages=Math.round(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
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
    getNextPage(){ 
        if($('.page-nav').hasClass('active')){
            $('.page-nav').removeClass('active');
        }
        if(this.state.currentPage<=this.state.totalPagination.length){
            var tempCurrentPage=this.state.currentPage+1;
            var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            this.setState({
                currentPage:tempCurrentPage,
                firstItemToShow:tempFirstItemToShow
            });
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(this.state.currentPage+1)+')').addClass('active');
                this.setEntreesItems();
            },300);
        }
    }
    getPrevPage(){
        if($('.page-nav').hasClass('active')){
            $('.page-nav').removeClass('active');
        }
        if(this.state.currentPage>1){
            var tempCurrentPage=this.state.currentPage-1;
            var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            this.setState({
                firstItemToShow:tempFirstItemToShow,
                currentPage:tempCurrentPage
            });
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(this.state.currentPage+1)+')').addClass('active');
                this.setEntreesItems();
            }, 300); 
        }
    }
    getPage=(e,index)=>{
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
                                    <li className="page-item page-nav">
                                        <a className="page-link" onClick={(e)=>this.getPage(e,index)}>{index}</a>
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
                        {
                                this.renderEntrees()
                            }
                            {
                                this.getPagination()
                            }
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