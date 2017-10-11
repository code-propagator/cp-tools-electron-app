import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import asyncValidate from './asyncValidate'
let uuidv4 = require('uuid/v4')

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes',
    'date'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
      // {firstname: 'Required', ...}
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}
// ---------------------------------
/*
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
*/
const renderTextField = (props) => {
  // console.log('renderTextField', props)
  // ---> input, label, meta is coming
  // input: Object {name: 'firstName', ..., value: ''}
  // if props.meta.touched is true and have some error in props.meta.error,
  // errorText showes some text messasge
  return <TextField
    hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.meta.touched && props.meta.error}
    {...props.input}
    {...props}
  />
}
// ---------------------------------
const renderCheckbox = ({ input, label }) => {
  // console.log('renderCheckbox', input, label)
  // input: Object {name:'employed', ..., value=true}
  // let flag = input.value ? true : false
  // ---> eslint error
  // ===> input.value is already boolean
  let flag = input.value
  return <Checkbox
    label={label}
    checked={flag}
    onCheck={input.onChange}
  />
}
// ---------------------------------
/*
const renderRadioGroup = ({ input, ...rest }) =>
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
*/
const renderRadioGroup = (props) => {
  // console.log('reanderRadioGroup', props)
  return <RadioButtonGroup
    {...props.input}
    {...props}
    valueSelected={props.input.value}
    onChange={(event, value) => props.input.onChange(value)}
  />
}
// ---------------------------------
/*
const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
*/
const renderSelectField = (props) =>
  <SelectField
    floatingLabelText={props.label}
    errorText={props.meta.touched && props.meta.error}
    {...props.input}
    onChange={(event, index, value) => props.input.onChange(value)}
    children={props.children}
    {...props}
  />
// https://redux-form.com/6.6.3/docs/api/field.md/#usage
// http://www.material-ui.com/#/components/date-picker
// const moment = require('moment')
// https://stackoverflow.com/questions/37720072/react-redux-form-material-ui-how-to-combine-datepicker-with-my-form
const renderDate = (props) => {
  return (
    <DatePicker
      floatingLabelText={props.label}
      errorText={props.meta.touched && props.meta.error}
      container='inline'
      onChange={(e, val) => props.input.onChange(val)}
      {...props}
      value={props.input.value}
    />
  )
}
// --------------------------------
// ===> For Material-UI, component property receives Material-UI component.
const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name='firstName'
          component={renderTextField}
          label='First Name'
        />
      </div>
      <div>
        <Field name='lastName' component={renderTextField} label='Last Name' />
      </div>
      <div>
        <Field name='email' component={renderTextField} label='Email' />
      </div>
      <div>
        <Field name='sex' component={renderRadioGroup}>
          <RadioButton value='male' label='male' />
          <RadioButton value='female' label='female' />
        </Field>
      </div>
      <div>
        <Field
          name='favoriteColor'
          component={renderSelectField}
          label='Favorite Color'
        >
          <MenuItem value='ff0000' primaryText='Red' />
          <MenuItem value='00ff00' primaryText='Green' />
          <MenuItem value='0000ff' primaryText='Blue' />
        </Field>
      </div>
      <div>
        <Field name='employed' component={renderCheckbox} label='Employed' />
      </div>
      <div>
        <Field
          name='notes'
          component={renderTextField}
          label='Notes'
          multiLine
          rows={2}
        />
      </div>
      <div>
        <Field
          name='date'
          component={renderDate}
          label='Date Picker'
        />
      </div>
      <hr />
      <div>
        <button type='submit' disabled={pristine || submitting}>
          Submit
        </button>
        <button type='button' disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}
// ---------------------------------
export default reduxForm({
  form: 'MaterialUiForm' + uuidv4(), // a unique identifier for this form
  validate,
  asyncValidate
})(MaterialUiForm)
