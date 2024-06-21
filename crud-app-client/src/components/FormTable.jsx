import React from 'react'
import "../App.css"
import { IoMdClose } from 'react-icons/io'

const FormTable = (props) => {
    const {handleSubmit, handelOnChange, handleClose, rest} = props
    console.log(rest, "rest log");
    return (
        <div className='addContainer'>
            <form onSubmit={handleSubmit} action="">
                <div className='close-btn' onClick={handleClose} > <IoMdClose/></div>

                <label htmlFor="name">Name : </label>
                <input type="text" id='name' name='name' value={rest.name} onChange={handelOnChange} />

                <label htmlFor="email"> Email : </label>
                <input type="email" id='email' name='email' value={rest.email} onChange={handelOnChange} />

                <label htmlFor="mobile">Mobile : </label>
                <input type="number" id='mobile' name='mobile' value={rest.mobile} onChange={handelOnChange} />

                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default FormTable