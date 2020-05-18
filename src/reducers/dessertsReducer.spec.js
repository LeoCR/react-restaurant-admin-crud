import dessertsReducer from "./dessertsReducer";
import { SHOW_DESSERTS} from "../constants/dessertTypes";
describe('Desserts Reducer', () => {
    const initialState = {
      desserts: [],
      dessert: null 
    };
    it('should handle initial state', () => {
      expect(
        dessertsReducer(undefined, {})
      ).toEqual({
        desserts:[],
        dessert:null
      })
    });
    it('Handle SHOW_DESSERTS',()=>{ 
      const dessertsList = [{
        "id": "9DESRT",
        "description": "Sweet apples with cinnamon and sweet cream",  
        "name": "Apple Pie", 
        "picture": "/img/uploads/apple_pie.jpg", 
        "price": "5.50"
      }];
      const action = {
        type: SHOW_DESSERTS,
        payload: dessertsList,
      };
      const expectedState = { ...initialState,desserts: dessertsList };
        expect(dessertsReducer(initialState,action)).toEqual(expectedState)
    })
});