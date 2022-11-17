import React from 'react'


const ViewProduct =(props)=>{

  return(<div className='view-product'>
    <h1>{props.product.name}</h1>
    <img src={props.product.image} style={{margin: '60px', border: 'solid'}} width='350px' alt={props.product.name} id='ride-image'/>
    <h3>Description: {props.product.description}</h3>
    <h2>Price: ${props.product.price}</h2>
    <form onSubmit={props.handleSubmit} className='form-type'>
      <h3>Message Seller</h3>
      <label htmlFor='name'>Name:</label>
      <input id='name' value={props.form.name} onChange={props.handleChange}></input>
      <label htmlFor='description'>Description</label>
      <textarea id='description' value={props.form.description} onChange={props.handleChange}></textarea>
      
      <button id='add' type='submit'>Add Comment</button>
    </form>
    </div>)
}
export default ViewProduct