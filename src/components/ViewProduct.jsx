import React from 'react'


const ViewProduct =(props)=>{

  return(
  <div className='view-product'>
    <h1>{props.product.name}</h1>
    <img src={props.product.image} className="imgVC" alt={props.product.name} id='ride-image'/>
    <h3>Description: {props.product.description}</h3>
    <h2>Price: ${props.product.price}</h2>
    <form onSubmit={props.handleSubmit} className='form-comment'>
      <h3>Message Seller</h3>
      <input id='name' className="form-fields" placeholder="Name" value={props.form.name} onChange={props.handleChange}></input>
      <textarea id='description' className="form-fields" placeholder="Description" value={props.form.description} onChange={props.handleChange}></textarea>
      <button id='add' className="updateButton" type='submit'>Add Comment</button>
    </form>
  </div>
    )
}
export default ViewProduct