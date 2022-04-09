import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useProducts from "../../Hooks/useProduct";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";

const Orders = () => {
  const [products, setProducts] = useProducts();
  const [cart, setCart] = useCart(products);

  /*   ekhane order er delete button declare kra hoiche sob amra jekhane cart state declare korbo shekhane btn event handler dibo.
   */

  const handleRemoveProduct = (product) => {
    const rest = cart.filter((pd) => pd.id !== product.id);
    setCart(rest);

    /* local storage theke delete kora hoiche niche state call kre hoiche fakebd components theke */

    removeFromDb(product.id);
  };

  /* button er maddome amra react navigate dara ek jaiga theke onno jaiga  te jete pari function declare kre */

  const navigate = useNavigate();
  return (
    <div className="shop-container">
      <div className="review-items-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveProduct={handleRemoveProduct}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        {/* ekhane children use hoiche  jar maddome ek jag theke arek jaiga te jai ekhane orders theke inventory te geche */}

        <Cart cart={cart}>
          {/* <Link to="/inventory">
            <button>Proceed Checkout</button>
          </Link> */}

          {/* amra simple button hishbe o call korte pari link use na kre */}

          <button onClick={() => navigate("/inventory")}>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
