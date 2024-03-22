import { useContext } from "react";

import { AppContext } from "../Context";



export function RouteHome() {
const {products} = useContext(AppContext);
console.log(products)

return (
<div>
    <h1>Home</h1>
    {products.map((product) => (
        <div key={product.id}>
            <h2>{product.title}</h2>
        </div>
            
            
        
    ))}

</div>
    
   
);

}