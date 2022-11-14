import React from 'react'


const ViewProduct =(props)=>{

  return(<div>
    <h1>{props.product.name}</h1>
    <img src={props.product.image} alt={props.product.name} id='ride-image'/>
    <h3>{props.product.description}</h3>
    <h3>${props.product.price}</h3>
    </div>)
}
export default ViewProduct