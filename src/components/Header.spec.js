import React from 'react'
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Enzyme,{ shallow,configure ,render} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";
Enzyme.configure({ adapter: new Adapter() });

describe("Testing Header Component",()=>{
    test("Counting dropdowns", () => { 
        const wrapper = shallow(<Header/>);
        expect(wrapper.find('.dropdown')).toHaveLength(7); 
    }); 
    test("Counting Links", () => { 
        const wrapper = shallow(<Header/>); 
        expect(wrapper.find(Link)).toHaveLength(14);
    }); 
    test("Onclick Dropdown", () => {  
        const component = shallow(<Header />);
        const instance = component.instance();
        const spyToggleSubmenu = sinon.spy(instance, 'toggleSubmenu'); 
        instance.forceUpdate();
        component.find('.dropdown').at(1).simulate('click'); 
        sinon.assert.calledOnce(spyToggleSubmenu); 
        //expect(component.find('.dropdown.open').at(1)).toHaveLength(1); 
        //expect(component.find('.dropdown').at(1).hasClass('open')).toEqual(true); 
    }); 
    
})