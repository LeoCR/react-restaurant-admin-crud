import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Entree from "../../components/view/entree";
import {getEntrees} from "../../actions/entreeActions"
class ShowEntrees extends Component{
    componentDidMount(){
        this.props.getEntrees();
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
                            {entrees.map(entree=>
                                 <Entree key={entree.id} info={entree}/> 
                            )}
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