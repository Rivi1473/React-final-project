import React from 'react'; 
import { useSelector,useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import '../../ProductDetails.css';
import {addOrder, emptyCart} from '../../features/orders/ordersSlice'
import {putProduct } from '../../features/products/productsSlice'


const months = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString().slice(-2));
const today = new Date();
const day = String(today.getDate()).padStart(2, '0'); // היום בפורמט "dd" (01 עד 31)
const month = String(today.getMonth() + 1).padStart(2, '0'); // החודש בפורמט "mm" (01 עד 12)
const formattedDate = `${day}/${month}/${currentYear}`; 
const Order = () => {
  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({ mode: 'onBlur', validateCriteriaMode: 'firstError' });
  const dispatch = useDispatch()

  const currentUser = useSelector(store => store.user.currentUser);
  const cart=useSelector(store => store.order.cart);
  const price=useSelector(store => store.order.price);

  const newOrder = {
    firstName: "",
    lastName:"",
    phone: "",
    city:"",
    street:"",
    houseNumber:"",
    email: currentUser.email,
    products:cart,
    price:price,
    date:formattedDate
  };
  const onSubmit = (data) => {
    newOrder.firstName = data.firstName;
    newOrder.lastName = data.lastName;
    newOrder.phone = data.phone;
    newOrder.city = data.city;
    newOrder.street = data.street;
    newOrder.houseNumber = data.houseNumber;
    newOrder.price = price;
    newOrder.date=formattedDate
    console.log(currentUser)
    console.log(cart)  
    dispatch(addOrder(newOrder))
    cart.forEach(product => {
          const updatedProduct = {
            ...product.p,
            qty: product.p.qty - product.quantity // עדכון כמות המוצר
          };
          console.log(updatedProduct)
          dispatch(putProduct({ id: product.p.id, updatedProduct }));
        });
        dispatch(emptyCart());
      
    dispatch(emptyCart())

  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
<div className='grid1'>
        <h3 className='full1'align="center">Personal details</h3>
        <TextField required fullWidth
              error={!!errors.firstName}
              InputLabelProps={{ style: { color: errors.firstName ? '#e6001a' : '#004AAD' } }}
              helperText={errors.firstName ? (
                errors.firstName.type === 'required' ? 'Required field' :
                  errors.firstName.type === 'minLength' ? 'At least 2 characters' :
                    errors.firstName.type === 'pattern' ? 'Only letters' : '') : ' '}
              label="First name"
              {...register("firstName", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })}
              defaultValue={currentUser.firstName}
              variant="standard"
            />
            <TextField
              required
              fullWidth
              error={!!errors.lastName}
              InputLabelProps={{ style: { color: errors.lastName ? '#e6001a' : '#004AAD' } }}
              helperText={errors.lastName ? (
                errors.lastName.type === 'required' ? 'Required field' :
                  errors.lastName.type === 'minLength' ? 'At least 2 characters' :
                    errors.lastName.type === 'pattern' ? 'Only letters' : '') : ' '}
              label="Last name"
              {...register("lastName", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })}
              defaultValue={currentUser.lastName}
              variant="standard"
            />
            <TextField
              required
              fullWidth
              error={!!errors.phone}
              InputLabelProps={{ style: { color: errors.phone ? '#e6001a' : '#004AAD' } }}
              helperText={errors.phone ? (
                errors.phone.type === 'required' ? 'required field' :
                  errors.phone.type === 'pattern' ? '10 numbers required' : '') : ' '}
              label="Phone"
              {...register("phone", { required: true, pattern: /^0[0-9]{9}$/, })}
               defaultValue={currentUser.phone}
              variant="standard"
            />
            <TextField
              required
              fullWidth
              error={!!errors.city}
              InputLabelProps={{ style: { color: errors.city ? '#e6001a' : '#004AAD' } }}
              helperText={errors.city ? (
                errors.city.type === 'required' ? 'required field' :
                  errors.city.type === 'minLength' ? 'At least 2 characters' :
                    errors.city.type === 'pattern' ? 'only letters' : '') : ' '}
              label="City"
              {...register("city", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })}
              variant="standard"
            />
            <TextField
              required
              fullWidth
              error={!!errors.street}
              InputLabelProps={{ style: { color: errors.street ? '#e6001a' : '#004AAD' } }}
              helperText={errors.street ? (
                errors.street.type === 'required' ? 'required field' :
                  errors.street.type === 'minLength' ? 'At least 2 characters' : '') : ' '}
              label="Street"
              {...register("street", { required: true, minLength: 2 })}
              variant="standard"
            />
            <TextField
              required
              fullWidth
              error={!!errors.houseNumber}
              InputLabelProps={{ style: { color: errors.houseNumber ? '#e6001a' : '#004AAD' }, shrink: true }}
              helperText={errors.houseNumber ? (
                errors.houseNumber.type === 'required' ? 'required field' :
                  errors.houseNumber.type === 'min' ? 'positive number required' : '') : ' '}
              label="House number"
              {...register("houseNumber", { required: true, min: 0 })}
              type="number"
              variant="standard"
            />
      </div>
      <Divider className='full'sx={{ my: 3, bgcolor: 'lightgray' }} />

     <div className='grid2'>
        <h3 className='full2'align="center">Payment details</h3>
        <TextField
        className='full2'
              required
              fullWidth
              error={!!errors.cardNumber}
              InputLabelProps={{ style: { color: errors.cardNumber ? '#e6001a' : '#004AAD' } }}
              helperText={errors.cardNumber ? 'Invalid card number' : ' '}
              label="Credit Card Number"
              {...register("cardNumber", { required: true, pattern: /^[0-9]{16}$/ })}
              variant="standard"
              inputProps={{ maxLength: 16 }}
            />
            <FormControl fullWidth error={!!errors.expiryMonth}>
              <InputLabel style={{ color: errors.expiryMonth ? '#e6001a' : '#004AAD' }}>Expiry Month</InputLabel>
              <Controller
                name="expiryMonth"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="standard"
                  >
                    {months.map(month => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
         
            <FormControl fullWidth error={!!errors.expiryYear}>
              <InputLabel style={{ color: errors.expiryYear ? '#e6001a' : '#004AAD' }}>Expiry Year</InputLabel>
              <Controller
                name="expiryYear"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="standard"
                  >
                    {years.map(year => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
         
            <TextField
              required
              fullWidth
              error={!!errors.cvv}
              InputLabelProps={{ style: { color: errors.cvv ? '#e6001a' : '#004AAD' } }}
              helperText={errors.cvv ? 'Invalid CVV' : ' '}
              label="CVV"
              {...register("cvv", { required: true, pattern: /^[0-9]{3}$/ })}
              variant="standard"
              inputProps={{ maxLength: 3 }}
            />
          </div>
          <div className='grid1'>
            <TextField 
              required
              fullWidth
              error={!!errors.name}
              InputLabelProps={{ style: { color: errors.name ? '#e6001a' : '#004AAD' } }}
              helperText={errors.name ? (
                errors.name.type === 'required' ? 'Required field' :
                errors.name.type === 'minLength' ? 'At least 2 characters' :
                errors.name.type === 'pattern' ? 'Only letters' : '') : ' '}
              label="Name of the cardholder"
              {...register("name", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })}
              variant="standard"
            />
         
            <TextField 
              required
              fullWidth
              error={!!errors.idNumber}
              InputLabelProps={{ style: { color: errors.idNumber ? '#e6001a' : '#004AAD' } }}
              helperText={errors.idNumber ? 'Invalid ID number' : ' '}
              label="ID of the cardholder"
              {...register("idNumber", { required: true, pattern: /^[0-9]{9}$/ })}
              variant="standard"
              inputProps={{ maxLength: 9 }}
            />
    
    </div>
          <h4>Total: {price} NIS</h4>
        <Button variant="outlined" type="submit" disabled={!isValid}>PAY</Button>
    </Box>
  );
};

export default Order;
