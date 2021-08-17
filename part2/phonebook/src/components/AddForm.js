import React from 'react'

const AddForm = ({name, number, submitHandler}) => (
    <>
    <form>
      <div>
        name: <input value={name.value} onChange={name.handler}/>
      </div>
      <div>
        number: <input value={number.value} onChange={number.handler}/>
      </div>
      <div>
        <button type="submit" onClick={submitHandler}>add</button>
      </div>
    </form>
    </>
)

export default AddForm
