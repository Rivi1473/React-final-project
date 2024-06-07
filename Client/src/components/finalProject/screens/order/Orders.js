import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from '../../features/orders/ordersSlice'
import Box from '@mui/material/Box';
import '../../ProductDetails.css';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState(null);
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    let arrOrders = useSelector(store => store.order.arrOrders);
    const status = useSelector(store => store.user.status);
    const mail = useSelector(store => store.user.currentUser.email);

    const showProducts = async (order) => {
        setProducts(order.products);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <h2> orders</h2>
        <Box sx={{ margin: '0 auto', maxWidth: '95%' }}>
            <TableContainer component={Paper}>
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Date</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Name</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Phone</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>City</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Street</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>House number</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Email</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Price</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>Products</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(arrOrders) && (status === 'customer' ? arrOrders.filter(x => x.email === mail).map(
                            order => {
                                return <TableRow key={order.id}>
                                    <TableCell align="center">{order.date}</TableCell>
                                    <TableCell align="center">{order.firstName} {order.lastName}</TableCell>
                                    <TableCell align="center">{order.phone}</TableCell>
                                    <TableCell align="center">{order.city}</TableCell>
                                    <TableCell align="center">{order.street}</TableCell>
                                    <TableCell align="center">{order.houseNumber}</TableCell>
                                    <TableCell align="center">{order.email}</TableCell>
                                    <TableCell align="center">{order.price}</TableCell>
                                    <TableCell align="center">{<IconButton onClick={() => { showProducts(order) }}>< ShoppingBasketIcon  /></IconButton>}</TableCell>
                                </TableRow>
                            }) : arrOrders.map(
                                order => {
                                    return <TableRow key={order.id}>
                                        <TableCell align="center">{order.date}</TableCell>
                                        <TableCell align="center">{order.firstName} {order.lastName}</TableCell>
                                        <TableCell align="center">{order.phone}</TableCell>
                                        <TableCell align="center">{order.city}</TableCell>
                                        <TableCell align="center">{order.street}</TableCell>
                                        <TableCell align="center">{order.houseNumber}</TableCell>
                                        <TableCell align="center">{order.email}</TableCell>
                                        <TableCell align="center">{order.price}</TableCell>
                                        <TableCell align="center">{<IconButton onClick={() => { showProducts(order) }}>< ShoppingBasketIcon  /></IconButton>}</TableCell>
                                    </TableRow>
                                }))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        {products && <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center" id="alert-dialog-title">
            </DialogTitle>
            <DialogContent>
                <DialogContentText align="center" id="alert-dialog-description">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">price</TableCell>
                                    <TableCell align="center">quantity</TableCell>
                                    <TableCell align="center">description</TableCell>
                                    <TableCell align="center">product</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((row) => (
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{row.p.price * row.quantity}</TableCell>
                                        <TableCell align="center">{row.quantity}</TableCell>
                                        <TableCell align="center">{row.p.description}</TableCell>
                                        <TableCell align="center"><Avatar src={row.p.imgUrl} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContentText>
            </DialogContent>
            <Button onClick={handleClose} sx={{ backgroundColor: "#acdaff", color: "#004AAD", width: "150px", margin: 'auto auto 15px auto' }} autoFocus>CLOSE</Button>
        </Dialog>}
    </>);
}

export default Orders;
