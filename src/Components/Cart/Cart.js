import React from "react";
import "./Cart.css";
const Cart = (props) => {
  const { cart } = props;
  // console.log(cart);
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }

  // tax ber korar way & tk koi decimal porjonto amra rakhbo seta amra Dot(.)tofixed(2)dibo.then amra tax er value ta k parse float kore dibo karon tax  er value ta string e ache .jokhon add korbo eti string add korbe.

  const tax = parseFloat((total * 0.1).toFixed(2));
  const grandTotal = total + shipping + tax;
  return (
    <div className="cart">
      <h2>Order Summary</h2>
      <p>Selected Items: {quantity} </p>
      <p>Total Price: ${total} </p>
      <p>Total Shipping: ${shipping} </p>
      <p>Tax: ${tax} </p>
      <h5>Grand Total: ${grandTotal.toFixed(2)} </h5>

      {/* use children using props */}

      {props.children}
    </div>
  );
};

export default Cart;
