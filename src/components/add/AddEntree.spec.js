import React from 'react';
import api from "../../api/api"
import {AddEntree} from "./AddEntree";
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
var tempEntrees; 
async function setEntrees(){
    try {
        await api.get('/api/entrees').then((res)=>{
            tempEntrees=res.data
        })
    } catch (error) {
        
    }
} 
let store; 
const props = {
    clearIngredientsByDish: jest.fn(),
    deleteIngredientDish: jest.fn(),
    setNextIdDishIngredient: jest.fn(),
    setDishId: jest.fn(),
    setAddIngredient: jest.fn(),
    addEntree: jest.fn(),
    getEntrees: jest.fn(),
}
describe("AddEntree Component",()=>{ 
    let component;
    let wrapper; 
    afterEach(()=>{
        cleanup();
    });
    beforeEach(() => {
        if(previewMode){ 
            setEntrees(); 
        }
        else{
            tempEntrees=[
                {
                    "id": "1ENTR",
                    "name": "Ceviche",
                    "description": "A little dish with marinated meat such as fish, seafood or both .",
                    "picture": "/img/entrees/ceviche.png",
                    "category": "Sea Food",
                    "price": 7.5
                  },
                  {
                    "id": "2ENTR",
                    "name": "Grilled Shrimp Salad",
                    "description": "A bed of romaine lettuce, followed \nby grilled peppers, corn, and shrimp. Then we \nbrighten this salad up with chopped grape tomatoes, a \ndiced avocado, and cucumbers.",
                    "picture": "/img/entrees/grilled-shrimp-salad.png",
                    "category": "Salad",
                    "price": 7.5
                  },
                  {
                    "id": "3ENTR",
                    "name": "Grilled Salmon Salad",
                    "description": "Light, fresh and healthy \ngrilled salmon Greek salad recipe. Crisp vegetables are \ntossed in a tangy lemon basil dressing and topped with\n flaky salmon.",
                    "picture": "/img/entrees/grilled-salmon-salad.png",
                    "category": "Salad",
                    "price": 7.5
                  },
                  {
                    "id": "4ENTR",
                    "name": "Grilled Sirloin Salad",
                    "description": "Preheat an outdoor grill for\n high heat and lightly oil the grate. Blend soy sauce, vinegar, brown \n sugar, sesame oil, garlic, and ginger together in a blender or food\n  processor until dressing is smooth. ",
                    "picture": "/img/entrees/grilled-sirloin-salad.png",
                    "category": "Salad",
                    "price": 6.6
                  },
                  {
                    "id": "5ENTR",
                    "name": "French Onion Soup",
                    "description": "With beef stock base, slow-cooked caramelized onions,\n French bread, gruyere and Parmesan cheese,especially with\n a thick slice of toasted bread loaded with melty Gruyere cheese \n and lots of caramelized onions.",
                    "picture": "/img/entrees/french-onion-soup.png",
                    "category": "Soup",
                    "price": 5.6
                  },
                  {
                    "id": "6ENTR",
                    "name": "Strips of Filet Mignon",
                    "description": "Oybox tomatoes, basil seed vinaigrette .",
                    "picture": "/img/entrees/strips-of-filet-mignon.png",
                    "category": "Meat",
                    "price": 6.5
                  },
                  {
                    "id": "7ENTR",
                    "name": "Filet Mignon Sandwich",
                    "description": "It is very simple, and \nthe filet mignon cut of beef steak is so tender and juicy!\n The steak is very flavorful alone, but is nicely complemented \n by the flavors of the spread, the \n vegetables, and the onion bun..",
                    "picture": "/img/entrees/marinated-filet-mignon-steak-sandwich.png",
                    "category": "Meat",
                    "price": 7.5
                  }
            ];
        }
        store = mockStore({
            entrees:{
                entrees:tempEntrees
            },
            ingredientsByDish:{
                ingredientsByDish:[]
            },
            modals:{
                idDish:'10ADDEDENTR_brRP',
                nextIdDishIngredient:67
            } 
        }); 
        if(previewMode){
            component = create(
                <Provider store={store}>
                  <AddEntree {...props}/>
                </Provider>
              ); 
              wrapper = shallow(
                  <Provider store={store}>
                       <AddEntree {...props}/>
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
    it('Should render 2 buttons',(done)=>{
        if(previewMode){
            const { getByTestId } = render( <Provider store={store}><AddEntree {...props} /></Provider>); 
            const btnSubmit = getByTestId('btn-submit');  
            expect(btnSubmit).toHaveClass('btn btn-primary font-weight-bold text-uppercase d-block w-100');  
            expect(btnSubmit.textContent).toEqual("Add");
            expect(wrapper.find('.btn-primary').text()).toEqual('Add');
            expect(wrapper.find("button")).toHaveLength(2);
            expect(wrapper.find("button").length).toEqual(2);
            done();
        }
        else{
            done();
        }
    });
    it("OnSubmit Form",(done)=>{ 
        if(previewMode){
            const instance = wrapper.instance();
            const spyAddEntree = sinon.spy(instance, 'addNewEntree');  
            instance.forceUpdate();
            wrapper.find('form').simulate('submit');  
            sinon.assert.calledOnce(spyAddEntree); 
            expect(spyAddEntree.called).toBe(true);
            done();
        }
        else{
            done();
        }
    });
    it("Handling State Change",(done)=>{ 
        if(previewMode){
            const file = new File(['awesome_entree_img'], 'new_entree.jpg', { type: 'image/jpg' })
            const { getByTestId,getByText } =  render(<AddEntree {...props} />)
            fireEvent.change( getByTestId('name-entree'), { target: { value: 'New Appetizer Name' }  });
            fireEvent.change( getByTestId('description-entree'), { target: { value: 'New Appetizer Description' }  });
            fireEvent.change( getByTestId('category-entree'), { target: { value: 'New Appetizer Category' }  });
            fireEvent.change( getByTestId('picture-entree'), { target: { files:[file]}});
            fireEvent.change( getByTestId('price-entree'), { target: { value: 5 }  });
            expect( getByTestId('name-entree').value).toEqual('New Appetizer Name');
            expect( getByTestId('description-entree').value).toEqual('New Appetizer Description');
            expect( getByTestId('category-entree').value).toEqual('New Appetizer Category');
            expect( getByText('You have uploaded a file named new_entree.jpg')).toBeTruthy();
            expect( parseInt(getByTestId('price-entree').value)).toEqual(5);
            done();
        }
        else{
            done();
        }
    })
})