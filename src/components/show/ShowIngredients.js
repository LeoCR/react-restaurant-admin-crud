import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Ingredient from "../view/ingredient";
import {getIngredients} from "../../actions/ingredientActions"
class ShowIngredients extends Component{
    constructor(props){
        super(props);
        this.state={
            ingredient:[],
            isLoading: true,
            errors: null
      };
    }
    componentDidMount(){
        this.props.getIngredients();
        axios.get('http://www.isplusdesign.co.cr:49652/api/ingredients')
            .then(response => {
                console.log(response.data);
                this.setState({
                    isLoading: false
                })
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            console.log('this.props.ingredients');
            console.log(this.props.ingredients);
        },1200);
        console.log(this.props);
    }
    render(){
        const { isLoading } = this.state;
        const {ingredients}=this.props;
        return(
            <React.Fragment>
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {ingredients.map(ingredient=>
                                 <Ingredient key={ingredient.idIngredient} info={ingredient}/> 
                            )}
                        </ul>
                    </div>
                </div> ) : (
                    <p>Loading Data From Database ,please Wait...</p>
                )}
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    ingredients:state.ingredients.ingredients
})
export default connect(mapStateToProps,{getIngredients})(ShowIngredients);