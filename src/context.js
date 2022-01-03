import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  totalPrice: 0
}
const clear = "CLEAR";
const increase = "INCREASE";
const decrease = "DECREASE";
const display = "DISPLAYITEM";
const loading = "LOADING";
const ttl = "TOTAL";
const ttlPrice = "TOTALPRICE";

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems)
  // const [total, setTotal] = useState(0);
  // const [ttlPrice, setttlPrice] = useState(0);
  // const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const clearItem = () => {
    // setCart([])
    dispatch({type: "CLEAR"});
  }
  const fetchApi = async () => {
    try {
      // setLoading(true);
      dispatch({type: "LOADING"});
      const res =  await fetch(url);
      const ret = await res.json();
      // setCart(ret);
      // setLoading(false);
      dispatch({type: "DISPLAYITEM", arg: ret});
    }catch(error){
      console.log(error);
    }finally{
      // setLoading(false);
    }

  }
  useEffect(
      () => {
        fetchApi();

      }

    ,[])
  const increase = (id) => {
    dispatch({type: "INCREASE", id: id});
    // const tmp = cart.map((item) => {
    //   if(item.id=== id){
    //     return {...item, amount: item.amount + 1}
    //   }
    //   return item;
    // })
    // setCart(tmp);
  }
  const decrease = (id) => {
    dispatch({type: "DECREASE", id: id});
    // const tmp = cart.map((item) => {
    //   if(item.id=== id){
    //     return {...item, amount: item.amount - 1}
    //   }
    //   return item;
    // }).filter((item) => item.amount != 0);
    // setCart(tmp);
  }
  const remove = (id) => {
    dispatch({type: "REMOVE", id: id});
    // const tmp = cart.filter((item) => item.id!== id);
    // setCart(tmp);
  }
  useEffect(
    () => {
      dispatch({type: "TOTAL"});
      // setTotal(cart.reduce((prev, curr) => prev + curr.amount, 0));
      // setttlPrice(cart.reduce((prev, curr) => prev + curr.amount * curr.price , 0).toFixed(2));
    },[state.cart]
  )
  return (
    <AppContext.Provider
      value={{
        ...state,
        increase,
        decrease,
        remove,  
        clearItem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
