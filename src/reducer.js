const clear = "CLEAR";
const increase = "INCREASE";
const decrease = "DECREASE";
const display = "DISPLAYITEM";
const loading = "LOADING"
const ttl = "TOTAL";
const remove = "REMOVE";


const reducer = (state, action) => {
	switch(action.type){
		case clear:
		{
		 return {...state, cart: []};
		}

		case increase:
		{
		 const tmp = state.cart.map((item) => {
	      if(item.id=== action.id){
	        return {...item, amount: item.amount + 1}
	      }
	      return item;
	     });
	     return{... state, cart: tmp}
		}

		case decrease:
		{
		 const tmp = state.cart.map((item) => {
	      if(item.id=== action.id){
	        return {...item, amount: item.amount - 1}
	      }
	      return item;
	     }).filter((item) => item.amount!=0);
	     ;
	     return{... state, cart: tmp}
		}
		case remove:
		{
		 const tmp = state.cart.filter((item) => item.id != action.id);
		 return {...state, cart: tmp}	
		}
		case display:
		{
		 return {...state, cart:action.arg, loading: false}	
		}

		case loading:
		{
		 return {...state, loading: true}
		}

		case ttl:
		{
		 const {ttl, ttlPrice} = state.cart.reduce(
		 	(ret, item) => {
		 		const {price, amount} = item;
		 		ret.ttl += amount;
		 		ret.ttlPrice += price*amount;
		 		return ret;
		 	},
		 	{ttl:0, ttlPrice: 0});
		 return {...state, total: ttl , totalPrice: ttlPrice.toFixed(2) }
		}
		default:
		{
			return state;
		}
	}
}

export default reducer



