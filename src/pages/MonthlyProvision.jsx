import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const MonthlyProvision = () => {
  const { 
    products, cartItems, 
    addToCart, updateCartItems, removeFromCart: removeAllFromCart, 
    getCartAmount, currency 
  } = useAppContext();

  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ Filter Dropdown Suggestions as User Types (Exclude Added Items)
  const handleNameChange = (e) => {
    const value = e.target.value;
    setNewItem(value);
    setError("");

    if (value.trim() === "") {
      setFilteredProducts([]);
    } else {
      const matchingProducts = products.filter(
        product => product.name.toLowerCase().includes(value.toLowerCase()) &&
        !cartItems[product._id] // ✅ Exclude already added items
      );
      setFilteredProducts(matchingProducts);
    }
  };

  // ✅ Handle Selection from Dropdown
  const selectItem = (name) => {
    setNewItem(name);
    setFilteredProducts([]);
  };

  // ✅ Handle Quantity Selection
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  // ✅ Add Item by Name and Quantity to Cart (Prevent Duplicate Addition)
  const addGroceryItem = () => {
    const itemInfo = products.find(product => product.name.toLowerCase() === newItem.toLowerCase());

    if (!itemInfo) {
      setError("Item not found! Please select a valid product.");
      return;
    }
    
    if (cartItems[itemInfo._id]) {
      setError("This item is already in your cart! Update the quantity instead.");
      return;
    }

    addToCart(itemInfo._id, quantity);
    setNewItem("");
    setQuantity(1);
    setFilteredProducts([]);
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">🛒 Grocery Cart</h1>

      {/* ✅ Grocery List */}
      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">📦 Your Items:</h2>
      <div className="bg-gray-100 p-3 rounded-lg">
        {Object.keys(cartItems).length === 0 ? (
          <p className="text-center text-gray-500">No groceries added yet.</p>
        ) : (
          <ul className="space-y-3">
            {Object.keys(cartItems).map((itemId) => {
              const itemInfo = products.find(product => product._id === itemId);
              return (
                <li key={itemId} className="p-4 bg-white shadow-md rounded-lg border border-gray-300 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-800">{itemInfo?.name}</p>
                    <p className="text-gray-600"> Quantity: {cartItems[itemId]}</p>
                    <p className="text-gray-600"> Price per Unit: ₹{itemInfo?.offerPrice || 0}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      name={`cart-${itemId}`}
                      id={`cart-${itemId}`}
                      min="1"
                      value={cartItems[itemId] || 1}
                      className="border p-2 w-16 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => updateCartItems(itemId, Number(e.target.value))}
                    />
                    <button className="text-red-500 hover:text-red-700 transition duration-200" onClick={() => removeAllFromCart(itemId)}>
                      <FaTrash size={18} />
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                      onClick={() => removeAllFromCart(itemId, true)}
                    >
                      Remove All
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ✅ Add Item + Dynamic Dropdown */}
      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">➕ Add Item:</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="relative flex gap-3 items-center bg-white p-3 rounded-lg shadow-md">
        <div className="relative w-full">
          <input
            type="text"
            name="itemName"
            id="itemName"
            className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Item Name"
            value={newItem}
            onChange={handleNameChange}
          />

          {/* ✅ Dropdown appears below input when typing */}
          {filteredProducts.length > 0 && (
            <ul className="absolute w-full bg-white shadow-lg rounded-md mt-1 z-10">
              {filteredProducts.map(product => (
                <li 
                  key={product._id} 
                  className="p-2 cursor-pointer hover:bg-blue-100 transition duration-200 rounded-md"
                  onClick={() => selectItem(product.name)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ Quantity Dropdown - Next to Input Field */}
        <select
          className="border p-3 w-24 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleQuantityChange}
          value={quantity}
        >
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
        <button
          onClick={addGroceryItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>

      {/* ✅ Budget Summary */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-extrabold text-gray-700">💰 Total Spent: ₹{getCartAmount()}</h2>
      </div>
    </div>
  );
};

export default MonthlyProvision;