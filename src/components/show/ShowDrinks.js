import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Drink from "../view/drink";
import {getDrinks} from "../../actions/drinkActions"
class ShowDrinks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            errors: null
      };
    }
    async componentDidMount(){
        this.props.getDrinks();
        await axios.get('http://localhost:49652/api/drinks')
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
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {drinks.map(drink=>
                                <Drink key={drink.id} info={drink}/> 
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