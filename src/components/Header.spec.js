import React from 'react'
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Enzyme,{ shallow,configure ,render} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";
Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(<Header/>);
describe("Testing Header Component",()=>{
    test("Counting dropdowns", () => {  
        expect(wrapper.find('.dropdown')).toHaveLength(7); 
    }); 
    test("Counting dropdown menus",()=>{ 
        expect(wrapper.find('.dropdown-menu')).toHaveLength(6); 
    })
    test("Counting Links", () => {   
        expect(wrapper.find(Link)).toHaveLength(14);
    }); 
    test("Onclick Dropdown", () => {  
        const wrapper = shallow(<Header />);
        const instance = wrapper.instance();
        const spyToggleSubmenu = sinon.spy(instance, 'toggleSubmenu'); 
        instance.forceUpdate();
        wrapper.find('.dropdown').at(1).simulate('click'); 
        sinon.assert.calledOnce(spyToggleSubmenu); 
        //expect(component.find('.dropdown.open').at(1)).toHaveLength(1); 
        //expect(component.find('.dropdown').at(1).hasClass('open')).toEqual(true); 
    }); 
    
})