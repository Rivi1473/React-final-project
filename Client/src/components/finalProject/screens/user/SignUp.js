import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import {addCurrentUser} from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm({ mode: 'onBlur', validateCriteriaMode: 'firstError' });
  const dispatch = useDispatch();
  const nav=useNavigate()

  const newUser = {
    firstName: "",
    lastName:"",
    phone: "",
    email: "",
    password: ""
  };
  const onSubmit = (data) => {
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.phone = data.phone;
    newUser.email = data.email;
    newUser.password = data.password;
    //אולי לבדוק לפני על ידי לוגין שאין כזה מייל
    dispatch(addCurrentUser(newUser));
    nav('/products')
  };

  return (
    <form className="width"align="center" onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign up</h3>
      <div className="grid1" align="center">
      <TextField required error={!!errors.firstName} InputLabelProps={{ style: { color: errors.firstName ? '#e6001a' : '#004AAD' } }} helperText={errors.firstName ? (
            errors.firstName.type === 'required' ? 'Required field' :
            errors.firstName.type === 'minLength' ? 'At least 2 characters' :
            errors.firstName.type === 'pattern' ? 'Only letters' : '') : ' '} label="First name" {...register("firstName", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })} variant="standard" />
        <TextField required error={!!errors.lastName} InputLabelProps={{ style: { color: errors.lastName ? '#e6001a' : '#004AAD' } }} helperText={errors.lastName ? (
            errors.lastName.type === 'required' ? 'Required field' :
            errors.lastName.type === 'minLength' ? 'At least 2 characters' :
            errors.lastName.type === 'pattern' ? 'Only letters' : '') : ' '} label="Last name" {...register("lastName", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })} variant="standard" />
        <TextField required error={!!errors.phone} InputLabelProps={{ style: { color: errors.phone ? '#e6001a' : '#004AAD' } }}           helperText={errors.phone ? (
            errors.phone.type === 'required' ? 'required field' :
            errors.phone.type === 'pattern' ? '10 numbers required' : '') : ' '} label="phone" {...register("phone", { required: true, pattern: /^0[0-9]{9}$/, })} variant="standard" />
        <TextField required error={!!errors.email} InputLabelProps={{ style: { color: errors.email ? '#e6001a' : '#004AAD' } }} helperText={errors.email ? (
            errors.email.type === 'required' ? 'Required field' :
            errors.email.type === 'pattern' ? 'Enter a valid email' : '') : ' '} label="Email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} variant="standard" />
        <TextField required error={!!errors.password} InputLabelProps={{ style: { color: errors.password ? '#e6001a' : '#004AAD' } }} helperText={errors.password ? (
            errors.password.type === 'required' ? 'Required field' :
            errors.password.type === 'minLength' ? 'At least 4 characters' : '') : ' '} label="Password" {...register("password", { required: true, minLength: 4, })} type="password" variant="standard" />
        <TextField required error={!!errors.confirmPassword} InputLabelProps={{ style: { color: errors.password ? '#e6001a' : '#004AAD' } }} helperText={errors.confirmPassword ? (
            errors.confirmPassword.type === 'required' ? 'Required field' :
            errors.confirmPassword.type === 'validate' ? 'Password is not the same' : '') : ' '} label="Confirm password" {...register("confirmPassword", { required: true, validate: value => getValues("password") === value })} type="password" variant="standard" />
      </div>
        
        <p>
          <Button variant="outlined" type="submit" disabled={!isValid}>SIGN UP</Button>
        </p>
    </form>
  );
}

export default SignUp;