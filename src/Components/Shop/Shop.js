// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useCart from "../../Hooks/useCart";
// import useProducts from "../../Hooks/useProduct";
// import { addToDb, getStoredCart } from "../../utilities/fakedb";
// import Cart from "../Cart/Cart";
// import Product from "../Product/Product";
// import "./Shop.css";
// const Shop = () => {
//   //page size orthath option gulo jonno state
//   const [size, setSize] = useState(10);

//   //set page that means currently kon page achi
//   const [page, setPage] = useState(0);

//   /* [ekhane amader nijerder banano hook use kortechi useProducts name die] */
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     fetch(`http://localhost:5000/product?page=${page}&size=${size}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, [page, size]);

//   /* useState([]); */
//   /* useEffect(() => {
//     fetch("products.json")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []); */
//   //product page count
//   const [pageCount, setPageCount] = useState(0);
//   useEffect(() => {
//     fetch("http://localhost:5000/productCount")
//       .then((res) => res.json())
//       .then((data) => {
//         const count = data.count;
//         const pages = Math.ceil(count / 10);
//         setPageCount(pages);
//       });
//   }, []);

//   // local storage part

//   useEffect(() => {
//     const storedCart = getStoredCart();
//     const savedCart = [];
//     for (const id in storedCart) {
//       const addedProduct = products.find((product) => product._id === id);
//       if (addedProduct) {
//         const quantity = storedCart[id];
//         addedProduct.quantity = quantity;
//         savedCart.push(addedProduct);
//       }
//     }
//     setCart(savedCart);
//   }, [products]);
//   // useState declare for add cart for user

//   const [cart, setCart] = useCart();
//   /* useEffect(() => {
//     const storedCart = getStoredCart();
//     const savedCart = [];
//     for (const id in storedCart) {
//       const addedProduct = products.find((product) => product._id === id);
//       if (addedProduct) {
//         const quantity = storedCart[id];
//         addedProduct.quantity = quantity;
//         savedCart.push(addedProduct);
//         // console.log(addedProduct);
//       }
//     }
//     setCart(savedCart);
//   }, [products]); */
//   const handleAddToCart = (selectedProduct) => {
//     console.log(selectedProduct);
//     let newCart = [];
//     // array er modde cart add korar way
//     const exists = cart.find((product) => product._id === selectedProduct._id);
//     if (!exists) {
//       selectedProduct.quantity = 1;
//       newCart = [...cart, selectedProduct];
//     } else {
//       const rest = cart.filter(
//         (product) => product._id !== selectedProduct._id
//       );
//       exists.quantity = exists.quantity + 1;
//       newCart = [...rest, exists];
//     }
//     setCart(newCart);

//     // local storage data save kore rakhar jonno fakedb k call korchi

//     addToDb(selectedProduct._id);
//   };
//   return (
//     <div className="shop-container">
//       <div className="products-container">
//         {products.map((product) => (
//           <Product
//             key={product._id}
//             product={product}
//             handleAddToCart={handleAddToCart}
//           ></Product>
//         ))}

//         {/* pagination set korar hard code */}
//         <div className="pagination">
//           {[...Array(pageCount).keys()].map((number) => (
//             <button
//               className={page === number ? "selected" : ""}
//               onClick={() => setPage(number)}
//             >
//               {number + 1}
//             </button>
//           ))}
//           <select onChange={(e) => setSize(e.target.value)}>
//             <option value="5">5</option>
//             <option value="10" selected>
//               10
//             </option>
//             <option value="15">15</option>
//             <option value="20">20</option>
//           </select>
//         </div>
//       </div>
//       <div className="cart-container">
//         <Cart cart={cart}>
//           <Link to="/orders">
//             <button>Review Order</button>
//           </Link>
//         </Cart>
//       </div>
//     </div>
//   );
// };

// export default Shop;

//updated code with pagination
/* import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import { addToDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [cart, setCart] = useCart();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/product?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [page, size]);

  useEffect(() => {
    fetch("http://localhost:5000/productCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 10);
        setPageCount(pages);
      });
  }, []);

  const handleAddToCart = (selectedProduct) => {
    console.log(selectedProduct);
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
        <div className="pagination">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              className={page === number ? "selected" : ""}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}

          <select onChange={(e) => setSize(e.target.value)}>
            <option value="5">5</option>
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/orders">
            <button>Review Order </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop; */

//raw code video between 48-49
import React, { useEffect, useState } from "react";
import { addToDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(products);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const handleAddToCart = (product) => {
    //console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
    console.log(newCart);
    //add to local storage database
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
