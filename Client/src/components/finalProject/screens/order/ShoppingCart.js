import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { removeFromShoppingCart } from '../../features/orders/ordersSlice'
import { Link, useNavigate } from "react-router-dom";



const ShoppingCart = (props) => {
    const small = props.show
    const status=useSelector(store=>store.user.status)
    const [order, setOrder] = useState(useSelector(c => c.order.cart))
    const [sum, setSum] = useState(useSelector(c => c.order.price))
    const dis = useDispatch()
    const nav=useNavigate()
    

    const del = (p) => {
        dis(removeFromShoppingCart(p))
        setOrder(order.filter(item => item !== p));
        setSum(sum - (p.quantity * p.p.price))
    }

    const addO=()=>{
        nav('/addOrder')
    }


    return (<>
        <h2>Shopping Cart</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">price</TableCell>
                        {small == 'false' && <TableCell align="center">available</TableCell>}
                        <TableCell align="center">quantity</TableCell>
                        {small == 'false' && <TableCell align="center">description</TableCell>}
                        <TableCell align="center">product</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order?.map((row) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row.p.price * row.quantity}</TableCell>
                            {small == 'false' && <TableCell align="center">{row.p.qty >= row.quantity ? 'true': 'false'}</TableCell>}
                            <TableCell align="center">{row.quantity}</TableCell>
                            {small == 'false' && <TableCell align="center">{row.p.description}</TableCell>}
                            <TableCell  align="center"><Avatar src={row.p.imgUrl} /></TableCell>
                            {small == 'false' && <IconButton aria-label="delete" onClick={() => { del(row) }}><DeleteIcon /></IconButton>}
                        </TableRow>
                    ))}
                    <TableCell align="center">sum:{sum}</TableCell>
                </TableBody>
            </Table>
        </TableContainer>
        {small == 'false'&&sum>0&&status=='customer'&&<button onClick={addO}>pay</button>}
        {status=='guest'&&small == 'false'&&<Link to='/login'>in order to make an order please login</Link>}
        {sum==0&&<h2>Your cart is empty</h2>}
        {sum==0&& <Link to="/products">shop here??</Link>}

        </>);
}

export default ShoppingCart;