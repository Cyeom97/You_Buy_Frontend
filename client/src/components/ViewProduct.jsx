import React from 'react'


const ViewProduct =(props)=>{

  return(<div>
    <h1>{props.product.name}</h1>
    <img src={props.product.image} alt={props.product.name} id='ride-image'/>
    <h3>{props.product.description}</h3>
    <h3>${props.product.price}</h3>
    <form onSubmit={props.handleSubmit} className='form-type'>
      <label htmlFor='name'>Name:</label>
      <input id='name' value={props.form.name} onChange={props.handleChange}></input>
      <label htmlFor='description'>Description</label>
      <textarea id='description' value={props.form.description} onChange={props.handleChange}></textarea>
      
      <button id='add' type='submit'>Add Comment</button>
    </form>
    </div>)
}
export default ViewProduct