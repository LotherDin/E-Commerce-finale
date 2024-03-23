import { ReactNode, createContext,useEffect,useState } from "react";
import { Product, TContext, User } from "./declarations";




export const AppContext = createContext<TContext>({
products: [],
users: [],
cart:[],
paid:false,
login:()=>{},
logout:()=>{},

addToCart:()=>{},
removeFromCart:()=>{},
// admin function
addProduct:()=>{},
removeProduct:()=>{},
setAdmin:()=>{},
//
checkout:()=>{},
getTotalProductInCart: () => 0,
onCheckoutSuccess: () => {},
getTotalAvailableProduct: () => 0,

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
function removeFromCart(idProduct:Product['id']){
    const productFound = cart.find((product) => product.prod.id === idProduct);
    if(!!productFound && productFound.count === 1){
        const newCart = cart.filter((productCart) => productCart.prod.id !== idProduct);
        setCart(newCart);
        if(!!productFound && productFound.count > 1){
            const newCart = cart.map((cartProduct) => {
                if(idProduct === cartProduct.prod.id)
                    return {...cartProduct, count: cartProduct.count - 1};
                return cartProduct;
            });
            setCart(newCart);
        
    }
}}
function addToCart(product:Product, count:number){
    const productFound = cart.find((productCart) => product.id === productCart.prod.id);
    if(!productFound){
        const newCart = [...cart,{prod:product, count:count}];
        setCart(newCart);
    } else {
        const newCart = cart.map((productCart)=>product.id === productCart.prod.id ? {...productCart, count: productCart.count + count} : {...productCart});
        setCart(newCart);
    }
}



function checkout(){
    setPaid(true);
    setCart([]);
}
function onCheckoutSuccess(){
    setPaid(false);
}
function getTotalProductInCart(){
    const total = cart.reduce((acc,productCart) =>{
        return acc + productCart.count;
    },0)
    return total;
}
function getTotalAvailableProduct( product:Product){
    const productInCart = cart.find(({prod})=>prod.id === product.id);
    const totalProductInCart = productInCart ? productInCart.count : 0;
    return product.count - totalProductInCart;

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
        
        addToCart,
        removeFromCart,
        addProduct,
        removeProduct,
        setAdmin,
        checkout,
        getTotalProductInCart,
        onCheckoutSuccess,
        getTotalAvailableProduct
        }}>
            {children}
        </AppContext.Provider>
    );
}


