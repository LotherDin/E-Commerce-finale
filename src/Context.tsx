import { ReactNode, createContext,useEffect,useState } from "react";
import { Product, TContext, User } from "./declarations";




export const AppContext = createContext<TContext>({
products: [],
users: [],
cart:[],
paid:false,
login:()=>{},
logout:()=>{},
/*
addToCart:()=>{},
removeToCart:()=>{},
// admin function
addProduct:()=>{},
removeProduct:()=>{},
setAdmin:()=>{},
//
checkcout:()=>{},
getTotalProductInCart: () => 0,
onCheckoutSuccess: () => {},
getTotalAvailableProduct: () => 0,
*/
});

interface Props {
    children:ReactNode;
}

export function ContextProvider({children}:Props){
    const [products, setProducts] = useState<Array<Product>>([]);
    const [users, setUsers] = useState<Array<User>>([]);
    const [cart, setCart] = useState<Array<Product>>([]);
    const [paid, setPaid] = useState<boolean>(false);



    async function getProducts(){
        const response = await fetch("http://localhost:3000/products");
        const data: Array<Product> = await response.json();
        setProducts(data);
      }

    function login( user:User){
        
        setUsers([...users,user]);
        
        localStorage.setItem("email", user.email );
    }
    function logout(){
        
        setUsers([]);
        localStorage.removeItem("email");
    }



    useEffect(()=>{
        getProducts();
    },[]);

    return(
        <AppContext.Provider value=
        {{products,
        users,
        cart,
        paid,
        login,
        logout,
        /*
        addToCart,
        removeToCart,
        addProduct,
        removeProduct,
        setAdmin,
        checkcout,
        getTotalProductInCart,
        onCheckoutSuccess,
        getTotalAvailableProduct
        */}}>
            {children}
        </AppContext.Provider>
    );
}


