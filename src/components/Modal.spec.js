import React from 'react' 
import Modal from "./Modal";
import {Provider} from "react-redux"; 
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]); 
describe("Modal Component",()=>{
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            modals: 'addIngredient',
        });
        store.dispatch = jest.fn();
        component = renderer.create(
          <Provider store={store}>
            <Modal />
          </Provider>
        );
        /**
        * @see https://www.robinwieruch.de/react-connected-component-test
        **/
    }); 
    it('Testing CSS Classes',()=>{
        const instance= component.root; 
        const element = instance.findByType("div"); 
        expect(element.props.children.props.className).toEqual('modal-dialog'); 
        const elementList = instance.findAllByType("div");
        const classNameslist = [
            { 
                className: "modal" 
            },
            { 
                className: "modal-dialog" 
            }, 
            { 
                className: 'modal-content' 
            }, 
            {
                 className: 'modal-header' 
            }, 
            {
                 className: 'modal-title' 
            } 
        ]; 
        elementList.forEach((el, index) => {
            expect(el.props.className.includes(`${classNameslist[index].className}`)).toBe(true);
        });     
    })
});