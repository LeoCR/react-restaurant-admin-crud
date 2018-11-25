import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Dessert from "../view/dessert";
import {getDesserts} from "../../actions/dessertActions"
class ShowDesserts extends Component{
    constructor(props){
        super(props);
        this.state={
            dessert:[],
            isLoading: true,
            errors: null
      };
    }
    componentDidMount(){
        this.props.getDesserts();
        axios.get('http://www.isplusdesign.co.cr:49652/api/desserts')
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
            console.log('this.props.desserts');
            console.log(this.props.desserts);
        },1200);
        console.log(this.props);
    }
    render(){
        const { isLoading } = this.state;
        const {desserts}=this.props;
        return(
            <React.Fragment>
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                            {desserts.map(dessert=>
                                 <Dessert key={dessert.idDessert} info={dessert}/> 
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
    desserts:state.desserts.desserts
})
export default connect(mapStateToProps,{getDesserts})(ShowDesserts);