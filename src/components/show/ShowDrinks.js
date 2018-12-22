import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Drink from "../view/drink";
import {getDrinks} from "../../actions/drinkActions"
class ShowDrinks extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            errors: null
      };
    }
    componentDidMount(){
        this.props.getDrinks();
        axios.get('http://localhost:49652/api/drinks')
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
            console.log('this.props.drinks');
            console.log(this.props.drinks);
        },1200);
        console.log(this.props);
    }
    render(){
        const { isLoading } = this.state;
        const {drinks}=this.props;
        return(
            <React.Fragment>
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {drinks.map(drink=>
                                 <Drink key={drink.idDrink} info={drink}/> 
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
    drinks:state.drinks.drinks
})
export default connect(mapStateToProps,{getDrinks})(ShowDrinks);