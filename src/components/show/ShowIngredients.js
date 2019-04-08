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
    async componentDidMount(){
        this.props.getIngredients();
        await axios.get('http://localhost:49652/api/ingredients')
            .then(response => {
                this.setState({
                    isLoading: false
                })
            })
            .catch(error => {
                console.log(error);
        });
    }
    render(){
        const { isLoading } = this.state;
        const {ingredients}=this.props;
        if(!ingredients){
            return(
                <div>
                    <p>Loading Data From Database ,please Wait...</p>
                </div>
            )
        }
        return(
            <React.Fragment>
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {ingredients.map(ingredient=>
                                 <Ingredient key={ingredient.id} info={ingredient}/> 
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