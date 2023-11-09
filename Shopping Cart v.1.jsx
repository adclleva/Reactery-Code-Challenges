/**
 * Coding Challenge: Build a Simple Shopping Cart Application
 *
 * Concepts Covered:
 * - State Management
 * - Component Lifecycle Methods
 * - API Integration
 *
 * Requirements:
 * 1. Use React for the frontend.
 * 2. Fetch product data from an API.
 *    - You can create a mock API using tools like JSONPlaceholder.
 *    - Or use any public APIs that provide product information.
 * 3. Display the list of products.
 * 4. Allow users to add products to the shopping cart.
 * 5. Display the items in the shopping cart.
 * 6. Allow users to remove items from the cart.
 * 7. Show the total price of the items in the cart.
 *
 * Challenge:
 *
 * Part 1: Fetch and Display Products
 *  - Create a React component called `ProductList`.
 *  - Use the useEffect hook to fetch product data from an API when the component mounts.
 *  - Display the list of products. Each product should show at least the name and price.
 *
 * Part 2: Shopping Cart Functionality
 *  - Create a React component called `ShoppingCart`.
 *  - Implement state variables using the useState hook to keep track of items in the cart.
 *  - Add a button next to each product in the `ProductList` to allow users to add the product to the cart.
 *  - Show the items added to the cart in the `ShoppingCart` component.
 *  - Add a button next to each item in the `ShoppingCart` to allow users to remove items.
 *
 * Part 3: Total Price
 *  - Calculate and display the total price of items in the `ShoppingCart`.
 *
 * Bonus:
 *  - Add a quantity selector next to each item in the shopping cart to allow users to change the quantity.
 *  - Implement a "Clear Cart" feature that empties the shopping cart.
 *
 * Hints:
 *  - You can use the fetch API or any library like Axios to perform API calls.
 *  - Use the useState and useEffect hooks for state management and side effects respectively.
 *
 * Evaluation Criteria:
 *  - Code quality and organization
 *  - Proper use of React features and best practices
 *  - Functionality
 *
 * Feel free to adapt the requirements and bonus features according to your needs. Good luck!
 *
 * API URL for Products: https://fakestoreapi.com/products

  To get   the list of all products, you can make a GET request to the above URL.

  Sample API response for a single product:
  json
  Copy code
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  }
 */

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  const addToShoppingCart = (product) => () => {
    // some returns a boolean | find returns the first instance
    if (!shoppingCart.some((cartItem) => cartItem.id === product.id)) {
      setShoppingCart((cartItems) => [...cartItems, product]);
    }
  };

  const removeFromShoppingCart = (product) => () => {
    // some returns a boolean | find returns the first instance
    if (shoppingCart.some((cartItem) => cartItem.id === product.id)) {
      setShoppingCart((cartItems) => cartItems.filter((cartItem) => cartItem.id !== product.id));
    }
  };

  const removeAllfromCart = () => {
    setShoppingCart([]);
  };

  const shoppingCartTotalPrice = shoppingCart.reduce((accumulator, currentCartItem) => {
    return accumulator + currentCartItem.price;
  }, 0);

  return (
    <>
      <ShoppingCart
        removeAllfromCart={removeAllfromCart}
        shoppingCartTotalPrice={shoppingCartTotalPrice}
        shoppingCart={shoppingCart}
        removeFromShoppingCart={removeFromShoppingCart}
      />
      ------------
      <ProductList addToShoppingCart={addToShoppingCart} />
    </>
  );
}

export default App;

const ProductList = ({ addToShoppingCart }) => {
  const [productData, setProductData] = useState([]);
  const [productError, setProductError] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [filterProductInput, setFilterProductInput] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsProductLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          throw new Error(`Error has occured: Status ${response.status}`);
        }
      } catch (error) {
        setProductError(error.message);
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (productError) {
    return <h1>{productError}</h1>;
  }

  if (isProductLoading) {
    return <h1>...Product Loading </h1>;
  }

  const onFilterProductInputChange = (event) => {
    setFilterProductInput(event.target.value.toLowerCase());
  };

  const filteredProducts = productData.filter((product) => {
    return product.title.toLowerCase().includes(filterProductInput);
  });

  return (
    <div>
      <h2>Product List</h2>
      <input value={filterProductInput} onChange={onFilterProductInputChange} />

      {filteredProducts.map((product) => {
        const { id, title, price } = product;
        return (
          <div key={id}>
            <h3>
              {title}: ${price}
            </h3>
            <button onClick={addToShoppingCart(product)}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

const ShoppingCart = ({ removeAllfromCart, shoppingCart, removeFromShoppingCart, shoppingCartTotalPrice }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <h3>Total: {shoppingCartTotalPrice}</h3>
      <button onClick={removeAllfromCart}>Remove all from Cart</button>
      {shoppingCart.map((product) => {
        const { id, title, price } = product;
        return (
          <div key={id}>
            <h3>
              {title}: ${price}
            </h3>
            <button onClick={removeFromShoppingCart(product)}>Remove From Cart</button>
          </div>
        );
      })}
    </div>
  );
};
