import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/assets";
export const AppContext = createContext();
import axios from 'axios'

axios.defaults.withCredentials = true


axios.defaults.baseURL = "http://localhost:5000/";



export const AppContextProvider = ({children})=>{

    const currency = '$';
    

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [budget, setBudget] = useState(15000)

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // fetch User Auth status

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('api/user/is-auth')

            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }

    // fetch all products
    const fetchProducts = async ()=>{
        setProducts(dummyProducts)
        
    }

    // Add product to cart

    const addToCart = (itemId, quantity = 1) => { // ✅ Default to 1 if not provided
        let cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            cartData[itemId] += quantity; // ✅ Now adds the selected number
        } else {
            cartData[itemId] = quantity;
        }
    
        setCartItems(cartData);
        toast.success(`${quantity} Added to Cart`);
    };

        // update Cart item quantity

        const updateCartItems = (itemId, quantity)=>{
            let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity;
            setCartItems(cartData)
            toast.success("Cart Updated")           
            
        }

        // remove Product from cart

        const removeFromCart = (itemId)=>{
            let cartData = structuredClone(cartItems);
            if (cartData[itemId]) {
                cartData[itemId] -= 1;
                if (cartData[itemId] === 0) {
                    delete cartData[itemId]
                }

            }
            toast.success("Removed From Cart")
            setCartItems(cartData)
        }


        // get cart Item count

        const getCartCount =()=>{
            let totalCount = 0
            for (const item in cartItems) {
                totalCount += cartItems[item];
                
            }
            return totalCount
        }

        // get cart total amount

        const getCartAmount = () => {
            let totalAmount = 0;
        
            for (const item in cartItems) {
                let iteminfo = products.find((product) => product._id === item);
                
                if (iteminfo && cartItems[item] > 0) {  // ✅ Check if item exists
                    totalAmount += iteminfo.offerPrice * cartItems[item];
                }               
            }
        
            return Math.floor(totalAmount * 100) / 100;  // ✅ Round the total
        };
        // use effect to render fetchProduct function

        useEffect(() => {
            fetchProducts();
            fetchUser()
        }, []);
        
    const value = {navigate, user, setUser,
        showUserLogin, setShowUserLogin,
        products, setProducts, currency, addToCart, updateCartItems,
        removeFromCart, cartItems, searchQuery, setSearchQuery,
        getCartAmount, getCartCount, setBudget, budget, axios
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}

