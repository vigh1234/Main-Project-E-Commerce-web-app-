import React from 'react'
import { useState } from 'react'

function CategoryForm({handleSubmit,value,setValue}) {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <input type='text' className='form-control' placeholder='Enter new category' 
            value={value} onChange={(e) =>setValue(e.target.value)}></input>
        </div>
        <span><button className='btn btn-primary'>submit</button></span>
      </form>
    </>
  )
}

export default CategoryForm
