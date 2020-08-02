import React from 'react';
import api from "../../api/api"
import {EditDessert} from "./EditDessert";
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
var tempDesserts; 
async function setDeseerts(){
    try {
        await api.get('/api/desserts').then((res)=>{
            tempDesserts=res.data
        })
    } catch (error) {
        
    }
} 
let store; 
const props = {
    updateDessert: jest.fn(),
    editDessert: jest.fn(),
    showDessert: jest.fn(),
    getIngredientsByDishId: jest.fn(),
    clearIngredientsByDish: jest.fn(),
    deleteIngredientDish: jest.fn(),
    setNextIdDishIngredient: jest.fn(),
    setDishId: jest.fn(),
    setAddIngredient: jest.fn(),
    addDessert: jest.fn(),
    getDesserts: jest.fn(),
    ingredientsByDish:{
        ingredientsByDish:[]
    },
    match:{
        params:{
            id:'1DESRT' 
        }
    }
}
describe("EditDessert Component",()=>{ 
    let wrapper; 
    afterEach(()=>{
        cleanup();
    });
    beforeEach(() => {
        if(previewMode){ 
            setDeseerts(); 
        }
        else{
            tempDesserts=[
                {
                    "id":"1DESRT",
                    "name":"Rice with Milk with cinnamon",
                    "description":"Sweet rice with cinnamon and sweet cream",
                    "picture":"/img/desserts/rice-with-milk.jpg",
                    "price":5.5
                },{
                    "id":"2DESRT",
                    "name":"Choco Strawberries",
                    "description":"Strawberries covered with Chocolate",
                    "picture":"/img/desserts/choco-strawberries.jpg",
                    "price":7.5
                }
            ];
        }
        store = mockStore({
            desserts:{
                desserts:tempDesserts,
                dessert:{
                    id:'1DESRT',
                    name:'Rice with Milk with cinnamon',
                    description:'Sweet rice with cinnamon and sweet cream',
                    picture:'/img/desserts/rice-with-milk.jpg',
                    price:5.5
                }
            },
            ingredientsByDish:{
                ingredientsByDish:[]
            },
            modals:{
                modals:'addIngredient',
                idDish:'1DESRT',
                nextIdDishIngredient:66
            } 
        }); 
        wrapper = shallow(
            <Provider store={store}>
                 <EditDessert {...props}/>
             </Provider>
        ).dive().dive();  
    });
    it('Should render a bunch of divs',( )=>{
        setTimeout(() => {
            expect(wrapper.find(".card-body")).toHaveLength(1);
            expect(wrapper.find(".card")).toHaveLength(1);
            expect(wrapper.find(".col-md-8")).toHaveLength(1);
            expect(wrapper.find(".row.justify-content-center.mt-5")).toHaveLength(1);
            expect(wrapper.find(".form-group")).toHaveLength(4);
        }, 500); 
    })
    it('Should render 2 buttons',()=>{
        setTimeout(() => {
            const { getByTestId } = render( <Provider store={store}><EditDessert {...props} /></Provider>); 
            const btnSubmit = getByTestId('btn-submit'); 
            expect(btnSubmit).toHaveClass('btn btn-primary font-weight-bold text-uppercase d-block w-100');  
            expect(btnSubmit.textContent).toEqual("Update");
            expect(wrapper.find('.btn-primary').text()).toEqual('Update');
            expect(wrapper.find("button")).toHaveLength(2);
            expect(wrapper.find("button").length).toEqual(2);
        }, 500);
    }); 
    it("OnSubmit Form",()=>{ 
        const instance = wrapper.instance();
        const spyAddDessert = sinon.spy(instance, 'editDessert');  
        setTimeout(() => {
            instance.forceUpdate();
            wrapper.find('form').simulate('submit');  
            sinon.assert.calledOnce(spyAddDessert); 
            expect(spyAddDessert.called).toBe(true);
        }, 500);
    });
    it("Handling State Change",()=>{ 
        setTimeout(() => {
            const file = new File(['awesome_dessert_img'], 'new_dessert.jpg', { type: 'image/jpg' })
            const { getByTestId,getByText } =  render(<EditDessert {...props} />)
            fireEvent.change( getByTestId('name-dessert'), { target: { value: 'New Dessert Name' }  });
            fireEvent.change( getByTestId('description-dessert'), { target: { value: 'New Dessert Description' }  });
            fireEvent.change( getByTestId('picture-dessert'), { target: { files:[file]}});
            fireEvent.change( getByTestId('price-dessert'), { target: { value: 5 }  });
            expect( getByTestId('name-dessert').value).toEqual('New Dessert Name');
            expect( getByTestId('description-dessert').value).toEqual('New Dessert Description');
            expect( getByText('You have uploaded a file named new_dessert.jpg')).toBeTruthy();
            expect( parseInt(getByTestId('price-dessert').value)).toEqual(5);
        }, 500);
    })
})