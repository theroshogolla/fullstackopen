import React from 'react'


const Input = ({value, setter}) => <input value={value} onChange={(event) => setter(event.target.value)} />
const AddForm = ({submitHandler, newNameState, newNumState}) => {
return(
  <>
  <h3>Add Person</h3>
  <form onSubmit={submitHandler}>
    <div>
      name: <Input value={newNameState.value} setter={newNameState.updater} />
    </div>
    <div>
      number: <Input value={newNumState.value} setter={newNumState.updater} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </>
  )
}

export default AddForm
