export interface Product{
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,
    count:number
    
}

export interface User{
    email:string,
    password:string,
    name:string,
    admin:boolean
}
export interface TContext{
    products:Array<Product>,
    users:Array<User>,
    cart:Array<Product>,
    paid:boolean,
    login:(user:User)=>void,
    logout:(email:User['email'])=>void,
    
    addToCart:(product:Product)=>void,
    removeFromCart:(product:Product)=>void,
    // admin function
    addProduct:(product:Product)=>void,
    removeProduct:(product:Product)=>void,
    setAdmin:(admin:boolean)=>void,
    //
    checkout:()=>void,
    getTotalProductInCart: () => number,
    onCheckoutSuccess: () => void,
    getTotalAvailableProduct: () => number,
    




}