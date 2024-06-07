import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../features/products/productsSlice';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Product from './Product';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import '../../ProductDetails.css';

const ProductList = () => {
    const arrProducts = useSelector(s => s.product.arrProducts) || []; // ודא ש-arrProducts הוא מערך
    const status = useSelector(store => store.user.status);
    const categories = ['All', 'Infants', 'Young Boys', 'Young Girls', 'Boys', 'Girls', 'Family'];
    const ages = [0, 2, 5, 7];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAge, setSelectedAge] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        dispatch(getAllProducts());
    };

    const add = () => {
        let p = {
            id: 0,
            name: "",
            description: "",
            category: "",
            price: 0,
            qty: 0,
            minAge: 0,
            imgUrl: ""
        };
        navigate('/addupdateproduct', { state: { p } });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleAgeChange = (e) => {
        setSelectedAge(e.target.value);
    };

    return (
        <>
            <div className="select">
                <div className="g1">
                    <InputLabel>קטגוריה</InputLabel>
                    <Select defaultValue='All' onChange={handleCategoryChange}>
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="g2">
                    <InputLabel>גיל מינימלי</InputLabel>
                    <Select defaultValue='0' onChange={handleAgeChange}>
                        {ages.map((age, index) => (
                            <MenuItem key={index} value={age}>{age}</MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Box className="products">
                {
                    Array.isArray(arrProducts) && (selectedCategory === 'All' ?
                        arrProducts.filter(x => x.minAge >= selectedAge)
                            .map((item) => (<Product key={item.id} myProduct={item} />)) :
                        arrProducts.filter(x => x.category === selectedCategory && x.minAge >= selectedAge)
                            .map((item) => (<Product key={item.id} myProduct={item} />))
                    )
                }
            </Box>
            {status === 'admin' && <button onClick={add}>ADD PRODUCT</button>}
        </>
    );
};

export default ProductList;
