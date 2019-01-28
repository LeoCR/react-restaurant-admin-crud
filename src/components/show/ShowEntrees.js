import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Entree from "../view/entree";
import {getEntrees} from "../../actions/entreeActions"
class ShowEntrees extends Component{
    constructor(props){
        super(props);
        this.state={
            entree:[],
            isLoading: true,
            errors: null
      };
    }
    componentDidMount(){
        this.props.getEntrees();
        axios.get('http://localhost:49652/api/entrees')
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
            console.log('this.props.entrees');
            console.log(this.props.entrees);
        },1200);
        console.log(this.props);
    }
    render(){
        const { isLoading } = this.state;
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
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {entrees.map(entree=>
                                 <Entree key={entree.id} info={entree}/> 
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
    entrees:state.entrees.entrees
})
export default connect(mapStateToProps,{getEntrees})(ShowEntrees);