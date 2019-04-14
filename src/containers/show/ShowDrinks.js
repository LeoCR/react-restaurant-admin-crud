import React from 'react';
import {connect} from "react-redux";
import Drink from "../../components/view/drink";
import {getDrinks} from "../../actions/drinkActions"
class ShowDrinks extends React.Component{
    async componentDidMount(){
        await this.props.getDrinks();
        console.log(this.props);
    }
    render(){
        const {drinks}=this.props;
        if(!drinks){
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
                            {drinks.map(drink=>
                                <Drink key={drink.id} info={drink}/> 
                            )}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    drinks:state.drinks.drinks
})
export default connect(mapStateToProps,{getDrinks})(ShowDrinks);