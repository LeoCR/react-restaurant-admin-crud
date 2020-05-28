import React from 'react' 
import Modal from "./Modal";
import {Provider} from "react-redux"; 
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'; 
/**
 * @see https://css-tricks.com/getting-started-with-react-testing-library/
**/
import { render, cleanup } from "@testing-library/react";
/**
* @see https://github.com/testing-library/jest-dom#tohavestyle
**/
import '@testing-library/jest-dom';
const mockStore = configureStore([]); 
describe("Modal Component",()=>{
    let store;
    let component;
    
    afterEach(cleanup);
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
    });
    it('Handle OnClick for Closing Modal',()=>{
        expect(document.body.classList.contains('modal-opened')).toBeFalsy();
        const { getByTestId } = render(<Provider store={store}>
            <Modal />
          </Provider>);
        renderer.act(() => {
            component.root.findByType('button').props.onClick();
        });  
        expect(document.body).toHaveClass('modal-opened');  
        const modalPopUp = getByTestId('modal');  
        expect(modalPopUp).toHaveStyle({display: 'none'})
        expect(document.body.classList.contains('modal-opened')).toBeTruthy();
       
    });
});