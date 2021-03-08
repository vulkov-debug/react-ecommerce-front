import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import {userCart} from '../functions/user'

const Cart = ({history}) => {
 const {cart, user} = useSelector((state) => ({...state}))
 const dispatch = useDispatch()

 const getTotal = () => {
     return cart.reduce((acc,cur) => {
         return acc+ cur.count * cur.price
     },0)
 }

const saveOrderToDb = () => {
  // alert('save order to DB')
  // console.log('cart', JSON.stringify(cart, null, 4))
  userCart(cart, user.token)
  .then(res => {
    console.log('CART POST RES', res)
    if(res.data.ok) history.push('/checkout')
  }).catch(err => console.log('Cart save Err', err))

}

const saveCashOrderToDb = () => {
  dispatch({
    type: "COD",
    payload: true
  })
  // alert('save order to DB')
  // console.log('cart', JSON.stringify(cart, null, 4))
  userCart(cart, user.token)
    .then((res) => {
      console.log("CART POST RES", res);
      if (res.data.ok) history.push("/checkout");
    })
    .catch((err) => console.log("Cart save Err", err));
};



const showCartItems = () => (
  <table className="table table-bordered">
    <thead className="thead-light">
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Brand</th>
        <th scope="col">Color</th>
        <th scope="col">Count</th>
        <th scope="col">Shipping</th>
        <th scope="col">Remove</th>
      </tr>
    </thead>
    {cart.map((p)=> <ProductCardInCheckout key={p._id} p={p} />)}
  </table>
);
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Cart / {cart.length} {cart.length === 1 ? "Product" : "Products"}
          </h4>
          {!cart.length ? (
            <p>
              No product in cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} * {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-small btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-small btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-small btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart