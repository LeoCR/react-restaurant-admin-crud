import React from 'react';
import {Dessert} from './dessert';
import Enzyme,{ shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
//import sinon from "sinon";
Enzyme.configure({ adapter: new Adapter() });
var wrapper;
describe('Dessert Component',()=>{
    var props={
        info:{
            id:"1DESRT",
            name:"Rice with Milk with cinnamon",
            description:"Sweet rice with cinnamon and sweet cream",
            picture:"/img/desserts/rice-with-milk.jpg",
            price:5.5
        },
        modals: 'addIngredient',
        productType:'Dessert',
        idToDelete:'1DESRT',
        setDelete:jest.fn()
    }
    wrapper=shallow(<Dessert {...props}/>);
    
    it('Should render a bunch of Html Elements',()=>{
        expect(wrapper.find('.list-group-item')).toHaveLength(1);
        expect(wrapper.find('.row.justify-content-between.align-items-center')).toHaveLength(1);
        expect(wrapper.find('.col-md-8.d-flex.justify-content-between.align-items-center')).toHaveLength(1);
        expect(wrapper.find('.text-dark.m-0')).toHaveLength(1);
        expect(wrapper.find('.badge.badge-warning.text-dark')).toHaveLength(1);
        expect(wrapper.find('.responsive-img.col-md-3')).toHaveLength(1);
        expect(wrapper.find('.col-md-4.d-flex.justify-content-end.acciones')).toHaveLength(1);
        expect(wrapper.find('.btn.btn-success.mr-2')).toHaveLength(1);
        expect(wrapper.find('.btn.btn-primary.ml-2')).toHaveLength(1);
    });/*
    it('Onclick deleteDessert',()=>{
        const instance = wrapper.instance();
        const spyDeleteDessert = sinon.spy(instance, 'deleteDessert'); 
        instance.forceUpdate();
        wrapper.find('.btn.btn-primary.ml-2').simulate('click');  
        sinon.assert.calledOnce(spyDeleteDessert); 
        expect(spyDeleteDessert.called).toBe(true);
    });*/
})