import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login } from '../../features/users/usersSlice';
import Button from '@mui/material/Button';
import {admin} from '../../features/users/usersSlice'


const Login = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur', validateCriteriaMode: 'firstError' })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const userStatus = useSelector(store => store.user.status);
    const nav=useNavigate()

    const onSubmit = () => {
        dispatch(login({ email, password }));
        if(password=='1234')
            dispatch(admin())
        nav('/products')
       if (userStatus == "guest")
            setError("לא תקין ")
        else {
            setError("")
            //  if(currentUser?.admin==true)
            //          dispatch(admin())
        }
    }

    return (<>
        <form className="width" onSubmit={handleSubmit(onSubmit)}>
            <h3>Login</h3>
            <div className="grid1">
                <TextField error={!!errors.email}
                    InputLabelProps={{ style: { color: errors.email ? '#e6001a' : '#004AAD' } }}
                    helperText={errors.email ? (
                        errors.email.type === 'required' ? 'required field' :
                            errors.email.type === 'pattern' ? 'enter a valid email' : '') : ' '}
                    label="Email"
                    {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)} />
                <TextField error={!!errors.password}
                    InputLabelProps={{ style: { color: errors.password ? '#e6001a' : '#004AAD' } }}
                    helperText={errors.password ? (
                        errors.password.type === 'required' ? 'required field' :
                            errors.password.type === 'minLength' ? 'at least 4 characters' : '') : ' '}
                    label="Password"
                    {...register("password", { required: true, minLength: 4 })}
                    type="password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <p>
                <Link to="/signup">Don't have an account? Sign up here</Link>
            </p>
            <p >
                <Button variant="outlined" type="submit" disabled={!isValid}>OK</Button>
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </form>
    </>);
}

export default Login;
