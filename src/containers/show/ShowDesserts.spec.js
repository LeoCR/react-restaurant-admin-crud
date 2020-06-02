import React from 'react';
import Enzyme,{ mount} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import ShowDesserts from "./ShowDesserts";
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store'; 
import {Provider} from "react-redux";
import {Dessert} from "../../components/view/dessert";
const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("ShowDesserts Component",()=>{
    var store;
    var wrapper;
    var dessertsArray=[
        {
          "id": "1DESRT",
          "name": "Rice with Milk with cinnamon",
          "description": "Sweet rice with cinnamon and sweet cream",
          "picture": "/img/desserts/rice-with-milk.jpg",
          "price": 5.5
        },
        {
          "id": "2DESRT",
          "name": "Choco Strawberries",
          "description": "Strawberries covered with Chocolate",
          "picture": "/img/desserts/choco-strawberries.jpg",
          "price": 7.5
        },
        {
          "id": "3DESRT",
          "name": "Ice Cream and Caramel",
          "description": "Chocolate ice cream on the crust",
          "picture": "/img/desserts/ice-cream-and-caramel.jpg",
          "price": 8.5
        },
        {
          "id": "4DESRT",
          "name": "Hazelnut Flans",
          "description": "Evaporated milk, sweetened condensed milk and liquefied chocolate and hazelnut cream",
          "picture": "/img/desserts/chocolate-and-hazelnut-flans.jpg",
          "price": 4.5
        },
        {
          "id": "5DESRT",
          "name": "Chocolate pudding",
          "description": "Sugar, flavored with chocolate and vanilla and thickened with a starch",
          "picture": "/img/desserts/chocolate-pudding.jpg",
          "price": 7.5
        },
        {
          "id": "6DESRT",
          "name": "Coconut Flan",
          "description": "Mix milk and condensed milk and add grated coconut",
          "picture": "/img/desserts/coconut-flan.jpg",
          "price": 7.5
        },
        {
          "id": "7DESRT",
          "name": "Flan caramel",
          "description": "The sweetened condensed milk and the evaporated milk make a Flan caramel rich .",
          "picture": "/img/desserts/flan-caramel.jpg",
          "price": 7.5
        },
        {
          "id": "8DESRT",
          "name": "Brownie and Ice Cream",
          "description": "Sweet Ice cream with a brownie",
          "picture": "/img/desserts/brownie-with-ice-cream.jpg",
          "price": 7.5
        }
    ];
    var props={
        getDesserts:jest.fn(),
        desserts:{
            desserts:dessertsArray
        }
    }
    beforeEach(() => {
        store = mockStore({
            desserts: {
                desserts:dessertsArray
            }
        });
        store.dispatch = jest.fn();
        wrapper = mount(
            <Provider store={store}>
              <MemoryRouter initialEntries={[ '/admin/main-courses' ]}>
                <ShowDesserts {...props}/>
              </MemoryRouter>
            </Provider>
        ); 
    }); 
    it('Should render a bunch of HTML elements',()=>{
        expect(wrapper.find('.row.justify-content-center')).toHaveLength(1);
        expect(wrapper.find('.col-md-9')).toHaveLength(1);
        expect(wrapper.find("#pagination-bottom")).toHaveLength(1);
        expect(wrapper.find("ul")).toHaveLength(2);
        expect(wrapper.find(".page-item")).toHaveLength(4);
        expect(wrapper.find(".page-nav")).toHaveLength(2);
        expect(wrapper.find(".page-link")).toHaveLength(8);
        expect(wrapper.find(Dessert)).toHaveLength(3);
        wrapper.update();
        expect(wrapper.find(Dessert)).toHaveLength(5); 
    })
})