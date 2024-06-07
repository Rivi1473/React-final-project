import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProduct} from '../../features/products/productsSlice'

const Product = (props) => {
    let p=props.myProduct
    const nav=useNavigate()
    const status=useSelector(store=>store.user.status)
    const dis=useDispatch()
    const product =()=>{
        
        nav('/productToAdd', { state: { p } })
    }
    const update =()=>{
        
        nav('/addupdateproduct', { state: { p } })
    }
    const del=()=>{
        dis(deleteProduct(p.id))
    }
    return (<>
        <Card  sx={{ maxWidth: 300, m: 3}}>
            <CardHeader title={p.description} />
            {<CardMedia  component="img" height="140" image={p.imgUrl} />}
            <CardContent>               
                   <button onClick={status=='admin'?update:product}>{ status=='admin'?'update':'more details'}</button>  
                   {status=='admin'&&<button onClick={del}>delete</button> }                            
            </CardContent>
        </Card>      
    </>);
}

export default Product;