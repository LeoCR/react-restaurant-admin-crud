import dessertsReducer from "./dessertsReducer";
describe('Desserts Reducer', () => {
    it('should handle initial state', () => {
      expect(
        dessertsReducer(undefined, {})
      ).toEqual({
        desserts:[]
      })
    })
});