import React,{Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import StrongDish from "../view/strongDish";
import {getStrongsDishes} from "../../actions/strongDishActions"
class ShowStrongsDishes extends Component{
    constructor(props){
        super(props);
        this.state={
            mainCourse:[],
            isLoading: true,
            errors: null
      };
    }
    componentDidMount(){
        this.props.getStrongsDishes();
        axios.get('http://www.isplusdesign.co.cr:49652/api/strongs-dish')
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
            console.log('this.props.strongsDishes');
            console.log(this.props.strongsDishes);
        },1200);
        console.log(this.props);
    }
    render(){
        const { isLoading } = this.state;
        const {strongsDishes}=this.props;
        return(
            <React.Fragment>
                {!isLoading ? ( 
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <ul>
                            {strongsDishes.map(strongDish=>
                                 <StrongDish key={strongDish.idStrongDish} info={strongDish}/> 
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
    strongsDishes:state.strongsDishes.strongsDishes
})
export default connect(mapStateToProps,{getStrongsDishes})(ShowStrongsDishes);