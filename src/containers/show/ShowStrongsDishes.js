import React,{Component} from 'react';
import {connect} from "react-redux";
import StrongDish from "../../components/view/strongDish";
import {getStrongsDishes} from "../../actions/strongDishActions"
class ShowStrongsDishes extends Component{
    componentDidMount(){
        this.props.getStrongsDishes();
    }
    render(){
        const {strongsDishes}=this.props;
        if(!strongsDishes){
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
                            {strongsDishes.map(strongDish=>
                                 <StrongDish key={strongDish.id} info={strongDish}/> 
                            )}
                        </ul>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    strongsDishes:state.strongsDishes.strongsDishes
})
export default connect(mapStateToProps,{getStrongsDishes})(ShowStrongsDishes);