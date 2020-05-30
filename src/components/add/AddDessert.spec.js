import React from 'react';
import api from "../../api/api"
import {AddDessert} from "./AddDessert";
import {Provider} from "react-redux"; 
import { create }  from 'react-test-renderer';
import configureStore from 'redux-mock-store'; 
import Enzyme,{ shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";
import { render, cleanup } from "@testing-library/react"; 
import '@testing-library/jest-dom';  
import {fireEvent} from "@testing-library/dom";
Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([]); 
var tempDesserts; 
async function setDeseerts(){
    await api.get('/api/desserts').then((res)=>{
        tempDesserts=res.data
    })
} 
let store; 
const props = {
    clearIngredientsByDish: jest.fn(),
    deleteIngredientDish: jest.fn(),
    setNextIdDishIngredient: jest.fn(),
    setDishId: jest.fn(),
    setAddIngredient: jest.fn(),
    addDessert: jest.fn(),
    getDesserts: jest.fn(),
}
describe("AddDessert Component",()=>{ 
    let component;
    let wrapper; 
    afterEach(()=>{
        cleanup();
    });
    beforeEach(() => {
        setDeseerts(); 
        store = mockStore({
            desserts:{
                desserts:tempDesserts
            },
            ingredientsByDish:{
                ingredientsByDish:[]
            },
            modals:{
                idDish:'11ADDEDDESRT_F2LV',
                nextIdDishIngredient:68
            } 
        }); 
        component = create(
          <Provider store={store}>
            <AddDessert {...props}/>
          </Provider>
        ); 
        wrapper = shallow(
            <Provider store={store}>
                 <AddDessert {...props}/>
             </Provider>
        ).dive().dive();  
    });
    it('Should render a bunch of divs',( )=>{
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
    })
    it('Should render 2 buttons',()=>{
        const { getByTestId } = render( <Provider store={store}><AddDessert {...props} /></Provider>); 
        const btnSubmit = getByTestId('btn-submit');  
        expect(btnSubmit).toHaveClass('btn btn-primary font-weight-bold text-uppercase d-block w-100');  
        expect(btnSubmit.textContent).toEqual("Add");
        expect(wrapper.find('.btn-primary').text()).toEqual('Add');
        expect(wrapper.find("button")).toHaveLength(2);
        expect(wrapper.find("button").length).toEqual(2);
    }); 
    it("OnSubmit Form",()=>{ 
        const instance = wrapper.instance();
        const spyAddDessert = sinon.spy(instance, 'addNewDessert');  
        instance.forceUpdate();
        wrapper.find('form').simulate('submit');  
        sinon.assert.calledOnce(spyAddDessert); 
        expect(spyAddDessert.called).toBe(true);
    });
    it("Handling State Change",()=>{ 
        const file = new File(['awesome_dessert_img'], 'new_dessert.jpg', { type: 'image/jpg' })
        const { getByTestId,getByText } =  render(<AddDessert {...props} />)
        fireEvent.change( getByTestId('name-dessert'), { target: { value: 'New Dessert Name' }  });
        fireEvent.change( getByTestId('description-dessert'), { target: { value: 'New Dessert Description' }  });
        fireEvent.change( getByTestId('picture-dessert'), { target: { files:[file]}});
        fireEvent.change( getByTestId('price-dessert'), { target: { value: 5 }  });
        expect( getByTestId('name-dessert').value).toEqual('New Dessert Name');
        expect( getByTestId('description-dessert').value).toEqual('New Dessert Description');
        expect( getByText('You have uploaded a file named new_dessert.jpg')).toBeTruthy();
        expect( parseInt(getByTestId('price-dessert').value)).toEqual(5);
    })
})