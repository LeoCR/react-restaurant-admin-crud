import React,{Component} from 'react';
import {connect} from "react-redux";
import Dessert from "../../components/view/dessert";
import {getDesserts} from "../../actions/dessertActions"
class ShowDesserts extends Component{
    componentDidMount(){
        this.props.getDesserts();
    }
    render(){
        const {desserts}=this.props;
        if(!desserts){
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
                            {desserts.map(dessert=>
                                 <Dessert key={dessert.id} info={dessert}/> 
                            )}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    desserts:state.desserts.desserts
})
export default connect(mapStateToProps,{getDesserts})(ShowDesserts);