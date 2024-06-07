import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import '../../ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/users/usersSlice'


const UsersForAdmin = () => {
    const dis = useDispatch() 
    dis(getAllUsers())
    const arrUsers =useSelector(store=>store.user.arrUsers)
    return (<>
        <h2> users</h2>
        <Box sx={{ margin: '0 auto', maxWidth: '95%' }}>
            <TableContainer component={Paper}>
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>name</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>phone</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>email</b></TableCell>
                            <TableCell sx={{ backgroundColor: "#acdaff", color: "#004AAD" }} align="center"><b>password</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrUsers && arrUsers.map(
                            user => {
                                return <TableRow key={user.id}>
                                    <TableCell align="center">{user.firstName} {user.lastName}</TableCell>
                                    <TableCell align="center">{user.phone}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.password}</TableCell>
                                </TableRow>
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>


    </>);
}

export default UsersForAdmin;