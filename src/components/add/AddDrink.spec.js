import React from 'react';
import api from "../../api/api"
import {AddDrink} from "./AddDrink";
import {Provider} from "react-redux"; 
import { create }  from 'react-test-renderer';
import configureStore from 'redux-mock-store'; 
import Enzyme,{ shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";
import { render, cleanup } from "@testing-library/react"; 
import '@testing-library/jest-dom';  
import {fireEvent} from "@testing-library/dom";
import {previewMode} from "../../config/previewMode";
Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([]); 
var tempDrinks; 
async function setDrinks(){
    try {
        await api.get('/api/drinks').then((res)=>{
            tempDrinks=res.data
        })
    } catch (error) {
        
    }
} 
let store; 
const props = {
    addDrink: jest.fn(),
    getDrinks: jest.fn()
}
describe("AddDrink Component",()=>{ 
    let component;
    let wrapper; 
    afterEach(()=>{
        cleanup();
    });
    beforeEach(() => {
        if(previewMode){ 
            setDrinks(); 
        }
        else{
            tempDrinks=[
                    {
                      "id": "10DRK",
                      "name": "Fresh of Oats",
                      "description": "Fresh Natural of Oat with Milk or water",
                      "picture": "/img/drinks/fresh-natural-of-oats.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "11DRK",
                      "name": "Fresh of Chocolate",
                      "description": "Fresh Natural of Chocolate with Milk",
                      "picture": "/img/drinks/fresh-natural-of-chocolate.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "1DRK",
                      "name": "Coca Cola",
                      "description": "Soft Drink",
                      "picture": "/img/drinks/coca-cola.jpg",
                      "price": 3
                    },
                    {
                      "id": "2DRK",
                      "name": "Coca Cola Light",
                      "description": "Light Soft Drink",
                      "picture": "/img/drinks/coca-cola-light.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "3DRK",
                      "name": "Coca Cola Zero",
                      "description": "Soft Drink without sugar",
                      "picture": "/img/drinks/coca-cola-zero.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "4DRK",
                      "name": "Fanta Orange",
                      "description": "Soft drink flavored with orange",
                      "picture": "/img/drinks/fanta-orange.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "5DRK",
                      "name": "Fanta Kolita",
                      "description": "Soft Drink",
                      "picture": "/img/drinks/fanta-kolita.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "6DRK",
                      "name": "Fresh Strawberry",
                      "description": "Fresh Natural of Strawberry with Milk or water",
                      "picture": "/img/drinks/fresh-natural-of-strawberry.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "7DRK",
                      "name": "Fresh of Pear",
                      "description": "Fresh Natural of Pear with Milk or water",
                      "picture": "/img/drinks/fresh-natural-of-pear.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "8DRK",
                      "name": "Fresh of Blackberry",
                      "description": "Fresh Natural of Blackberry with Milk or water",
                      "picture": "/img/drinks/fresh-natural-of-blackberry.jpg",
                      "price": 4.5
                    },
                    {
                      "id": "9DRK",
                      "name": "Fresh of Watermelon",
                      "description": "Fresh Natural of Watermelon with Milk or water",
                      "picture": "/img/drinks/fresh-natural-of-watermelon.jpg",
                      "price": 4.5
                    }
            ];
        }
        store = mockStore({
            drinks:{
                drinks:tempDrinks
            }
        }); 
        if(previewMode){
            component = create(
                <Provider store={store}>
                  <AddDrink {...props}/>
                </Provider>
              ); 
              wrapper = shallow(
                  <Provider store={store}>
                       <AddDrink {...props}/>
                   </Provider>
              ).dive().dive(); 
        } 
    });
    it('Should render a bunch of divs',( done)=>{
        if(previewMode){
            const instance= component.root;   
            const elementList = instance.findAllByType("div");
            const divsClassNameslist = [
                { 
                    className: "row justify-content-center mt-5" 
                },
                { 
                    className: "col-md-8" 
                }, 
                { 
                    className: 'card' 
                }, 
                {
                    className: 'card-body' 
                }, 
                {
                    className: 'form-group' 
                }, 
                {
                    className: 'form-group' 
                },
                {
                    className: 'form-group' 
                },
                {
                    className: 'form-group' 
                } 
            ];
            elementList.forEach((el, index) => {
                expect(el.props.className.includes(`${divsClassNameslist[index].className}`)).toBe(true);
            }); 
            done();
        }
        else{
            done();
        }
    })
    it('Should render 1 button1',(done)=>{
        if(previewMode){
            const { getByTestId } = render( <Provider store={store}><AddDrink {...props} /></Provider>); 
            const btnSubmit = getByTestId('btn-submit');  
            expect(btnSubmit).toHaveClass('btn btn-primary font-weight-bold text-uppercase d-block w-100');  
            expect(btnSubmit.textContent).toEqual("Add");
            expect(wrapper.find('.btn-primary').text()).toEqual('Add');
            expect(wrapper.find("button")).toHaveLength(1); 
            done();
        }
        else{
            done();
        }
    });
    it("OnSubmit Form",(done)=>{ 
        if(previewMode){
            const instance = wrapper.instance();
            const spyAddDrink = sinon.spy(instance, 'addNewDrink');  
            instance.forceUpdate();
            wrapper.find('form').simulate('submit');  
            sinon.assert.calledOnce(spyAddDrink); 
            expect(spyAddDrink.called).toBe(true);
            done();
        }
        else{
            done();
        }
    });
    it("Handling State Change",(done)=>{ 
        if(previewMode){
            const file = new File(['awesome_drink_img'], 'new_drink.jpg', { type: 'image/jpg' })
            const { getByTestId,getByText } =  render(<AddDrink {...props} />)
            fireEvent.change( getByTestId('name-drink'), { target: { value: 'New Drink Name' }  });
            fireEvent.change( getByTestId('description-drink'), { target: { value: 'New Drink Description' }  });
            fireEvent.change( getByTestId('picture-drink'), { target: { files:[file]}});
            fireEvent.change( getByTestId('price-drink'), { target: { value: 5 }  });
            expect( getByTestId('name-drink').value).toEqual('New Drink Name');
            expect( getByTestId('description-drink').value).toEqual('New Drink Description');
            expect( getByText('You have uploaded a file named new_drink.jpg')).toBeTruthy();
            expect( parseInt(getByTestId('price-drink').value)).toEqual(5);
            done();
        }
        else{
            done();
        }
    })
})