import React from 'react'
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Enzyme,{ shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";
Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(<Header/>);
describe("Header Component",()=>{
    it("Counting dropdowns", () => {  
        expect(wrapper.find('.dropdown')).toHaveLength(7); 
    }); 
    it("Counting dropdown menus",()=>{ 
        expect(wrapper.find('.dropdown-menu')).toHaveLength(6); 
    })
    it("Counting Links", () => {   
        expect(wrapper.find(Link)).toHaveLength(13);
    }); 
    it("Onclick Dropdown", () => {   
        const instance = wrapper.instance();
        const spyToggleSubmenu = sinon.spy(instance, 'toggleSubmenu'); 
        /**
        ** @see https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/ 
        **/
        instance.forceUpdate();
        wrapper.find('.dropdown').at(1).simulate('click');  
        sinon.assert.calledOnce(spyToggleSubmenu); 
        expect(spyToggleSubmenu.called).toBe(true);
        expect(wrapper.find('.dropdown.open').at(1)).toHaveLength(0); 
        expect(wrapper.find('.dropdown').at(1).hasClass('open')).toEqual(false); 
    }); 
    it("Nav Menu Items text", () => {   
        expect(wrapper.find('.menu-main-item').at(0).props().children[0]).toEqual('Main Courses');
        expect(wrapper.find('.menu-main-item').at(1).props().children[0]).toEqual('Desserts');
        expect(wrapper.find('.menu-main-item').at(2).props().children[0]).toEqual('Appetizers');
        expect(wrapper.find('.menu-main-item').at(3).props().children[0]).toEqual('Ingredients');
        expect(wrapper.find('.menu-main-item').at(4).props().children[0]).toEqual('Drinks'); 
    });
})