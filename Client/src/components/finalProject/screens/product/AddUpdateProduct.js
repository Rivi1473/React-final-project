
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { postProduct, putProduct } from '../../features/products/productsSlice';
import '../../ProductDetails.css';

const categories = ['Infants', 'Young Boys', 'Young Girls', 'Boys', 'Girls', 'family'];

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur', validateCriteriaMode: 'firstError' })
  const { state } = useLocation();
  let product = state.p;
  const [imageSrc, setImageSrc] = useState(product.id == 0 ? null : product.imgUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    product.name = data.name;
    product.description = data.description;
    product.category = data.category;
    product.price = data.price;
    product.qty = data.qty;
    product.minAge = data.minAge;
    product.imgUrl = data.imgUrl;
    product.id == 0 ? dispatch(postProduct(product)) : dispatch(putProduct( {id:product.id , updatedProduct:product}));
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <form className="width" align="center" onSubmit={handleSubmit(onSubmit)}>
      <p align="center"><Avatar sx={{ width: 75, height: 75 }} src={imageSrc} /></p>
      <div className='grid1'>
        <TextField
          required
          error={!!errors.name}
          InputLabelProps={{ style: { color: errors.name ? '#e6001a' : '#004AAD' } }}
          helperText={errors.name ? (
            errors.name.type === 'required' ? 'required field' :
              errors.name.type === 'minLength' ? 'At least 2 characters' : '') : ' '}
          label="Name"
          {...register("name", { required: true, minLength: 2, pattern: /^([A-Za-z]{2})(\s*[A-Za-z\s]*)?$/i })}
          variant="standard"
          defaultValue={product.id != 0 ? product.name : ""}
        />

        <TextField
          required
          error={!!errors.description}
          InputLabelProps={{ style: { color: errors.description ? '#e6001a' : '#004AAD' } }}
          helperText={errors.description ? 'required field' : ' '}
          label="Description"
          {...register("description", { required: true })}
          variant="standard"
          defaultValue={product.id != 0 ? product.description : ""}
        />

        <FormControl variant="standard" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            {...register("category", { required: true })}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          error={!!errors.price}
          InputLabelProps={{ style: { color: errors.price ? '#e6001a' : '#004AAD' } }}
          helperText={errors.price ? (
            errors.price.type === 'required' ? 'required field' :
              errors.price.type === 'min' ? 'Minimum price is 0' : '') : ' '}
          label="Price"
          type="number"
          {...register("price", { required: true, min: 0 })}
          variant="standard"
          defaultValue={product.id != 0 ? product.price : ""}
        />

        <TextField
          required
          error={!!errors.qty}
          InputLabelProps={{ style: { color: errors.qty ? '#e6001a' : '#004AAD' } }}
          helperText={errors.qty ? (
            errors.qty.type === 'required' ? 'required field' :
              errors.qty.type === 'min' ? 'Minimum quantity is 0' : '') : ' '}
          label="Quantity"
          type="number"
          {...register("qty", { required: true, min: 0 })}
          variant="standard"
          defaultValue={product.id != 0 ? product.qty : ""}
        />

        <TextField
          required
          error={!!errors.minAge}
          InputLabelProps={{ style: { color: errors.minAge ? '#e6001a' : '#004AAD' } }}
          helperText={errors.minAge ? (
            errors.minAge.type === 'required' ? 'required field' :
              errors.minAge.type === 'min' ? 'Minimum age is 0' : '') : ' '}
          label="Minimum Age"
          type="number"
          {...register("minAge", { required: true, min: 0 })}
          variant="standard"
          defaultValue={product.id != 0 ? product.minAge : ""}
        />
          <TextField
          required
          error={!!errors.imgUrl}
          InputLabelProps={{ style: { color: errors.imgUrl ? '#e6001a' : '#004AAD' } }}
          helperText={errors.imgUrl ? (
            errors.imgUrl.type === 'required' ? 'required field' :'') : ' '}
          label="Image URL"
          {...register("imgUrl", { required: true })}
          variant="standard"
          defaultValue={product.id != 0 ? product.imgUrl : ""}
        />
        <p className="red">* required fields</p>
        </div>
        <Button type="submit" variant="contained" color="primary">{product.id != 0 ? "UPDATE" : "ADD"}</Button>

    </form>
  );
};

export default AddProductForm;
