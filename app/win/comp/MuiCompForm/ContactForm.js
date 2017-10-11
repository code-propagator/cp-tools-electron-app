import React from 'react'
import { Field, reduxForm } from 'redux-form'
let uuidv4 = require('uuid/v4')

let ContactForm = props => {
  // here 'handleSubmit' is automatically generated function
  // which calls onSubmit handler specified in the caller in MuiCompForm.js
  const { handleSubmit } = props

  let fieldDef = [
    {
      name: 'firstName',
      title: 'First Name',
      component: 'input',
      type: 'text'
    },
    {
      name: 'lastName',
      title: 'Last Name',
      component: 'input',
      type: 'text'
    },
    {
      name: 'email',
      title: 'Email',
      component: 'input',
      type: 'email'
    }
  ]
  let fields = fieldDef.map((field, index) => {
    return <div>
      <label htmlFor={field.name}>{field.title}</label>
      <Field name={field.name} component={field.component} type={field.type} />
    </div>
  })
  /*
  <div>
    <label htmlFor='firstName'>First Name</label>
    <Field name='firstName' component='input' type='text' />
  </div>
  <div>
    <label htmlFor='lastName'>Last Name</label>
    <Field name='lastName' component='input' type='text' />
  </div>
  <div>
    <label htmlFor='email'>Email</label>
    <Field name='email' component='input' type='email' />
  </div>
  */
  // ==> values will be like {email: "ccc@dd.ee", firstName: "AAAA", lastName: "BBBB"}
  return (
    <form onSubmit={handleSubmit}>
      {fields}
      <button type='submit'>Submit</button>
    </form>
  )
}

// https://stackoverflow.com/questions/46089325/uncaught-typeerror-cannot-set-property-valid-of-reduxform-which-has-only-a-g
ContactForm = reduxForm({
  form: 'contact' + uuidv4() // a unique name for the form
})(ContactForm)

export default ContactForm
