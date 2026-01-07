import React, { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext([]);
const CartDispatchContext = createContext(() => {});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "DROP":
      return [];
    case "UPDATE":
      // Find index of item with matching ID and Size
      let index = state.findIndex(
        (food) => food.id === action.id && food.size === action.size
      );
      if (index !== -1) {
        let arr = [...state];
        arr[index] = {
          ...arr[index],
          qty: parseInt(action.qty) + arr[index].qty,
          price: action.price + arr[index].price,
        };
        return arr;
      }
      return state;
    default:
      console.log("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartStateContext);
  return context ?? [];
};
export const useDispatchCart = () => useContext(CartDispatchContext);
