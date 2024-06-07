// import logo from './logo.svg';
// //import './App.css';
// //import Father from './components/less1/'
// //import Background from './components/less1/Background'
// //import ToDoList from './components/less2/ToDoList';
// import ToDoList2 from './components/less2/ToDoList2';
// //import ClothingStore from './components/less4/ClothingStore';
// //import { BrowserRouter, Routes, Route ,Link} from 'react-router-dom';
// //import ClothingStore from './components/less3/ClothingStore';
// //import Login from './components/less5/Login';
// //import Details from './components/less5/Details';
// import CourseList from './components/less5/CourseList';
// import Home from './components/less5/Home';
// import Gym from './components/less6/Gym';
// import ClothingStore from './components/less6/shop/ClothingStore';
// //import Home from './components/less5/Home';
// import AllUsers from './components/less7/AllUsers';
// import Text from './components/less7/Text';
// import Timer from './components/less7/Timer'
// import TimerWrapper from './components/less7/TimerWrapper';
// import TimerWrapperFunc from './components/less7/TimerWrapperFunc';
// import Arries from './components/less7/Arries';
// import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
// //import Login from './components/Project/Login';
// import Users from './components/Project/Users';
// import ToDoList from './components/Project/ToDoList';
// import { useState } from 'react';
// import Details from './components/less10/Detailes';
// import SignUp from './components/FinalProject/SignUp';
// import Login from './components/FinalProject/Login';
// import Navbar from './components/FinalProject/Navbar';
// import AddOrder from './components/FinalProject/AddOrder';
// import Orders from './components/FinalProject/Orders';
// import AddUpdateProduct from './components/FinalProject/AddUpdateProduct'
// function App() {

//   return (<div className="app">
//   {/* <Arries></Arries> */}
//   <>
//   {/* <Details></Details> */}

// {/* פרויקט גמר */}
// {/* <Order></Order> */}
// <BrowserRouter> 
// <Navbar ></Navbar>
// <AddUpdateProduct></AddUpdateProduct>
// <Orders></Orders>
//  <Routes>
//   <Route path="" element={<SignUp/>}></Route>
//   <Route path="signup" element={<SignUp/>}></Route>
//   <Route path="login" element={<Login/>}></Route>
//   <Route path="addorder" element={<AddOrder/>}></Route>

//   {/* <Route path="users" element={<Users/>}>
//     <Route path="tasks" element={<ToDoList/>}></Route>
//   </Route> */}
// </Routes> 
// </BrowserRouter>
//   {/* פרויקט */}
// {/* <BrowserRouter> 
//  <Routes>
//   <Route path="" element={<Login/>}></Route>
//   <Route path="tasks" element={<ToDoList/>}></Route>
//   <Route path="users" element={<Users/>}>
//     <Route path="tasks" element={<ToDoList/>}></Route>
//   </Route>
// </Routes> 
// </BrowserRouter> */}


// {/* 
// <BrowserRouter> 
//  <Routes>
//   <Route path="" element={<Login/>}></Route>
//   <Route path="tasks" element={<ToDoList/>}></Route>
//   <Route path="users" element={<Users/>}>
//     <Route path="tasks" element={<ToDoList/>}></Route>
//   </Route>
// </Routes> 
// </BrowserRouter> */}

// </>
//   {/* <TimerWrapperFunc></TimerWrapperFunc>
//    <TimerWrapper></TimerWrapper>  */}
//   {/* <Timer></Timer> */}
//   {/* <Text></Text> */}
//   {/* <AllUsers></AllUsers> */}
//   {/* <ClothingStore></ClothingStore> */}
//   {/* <Gym></Gym> */}
//   {/* less5 */}
//   {/* <BrowserRouter>
// <nav>
//         <ul>
//           <li><Link to="home">עמוד הבית</Link></li>
//           <li><Link to="login">התחברות </Link></li>
//           <li><Link to="details">פרטי חוג </Link></li>
//           <li><Link to="courseList">רשימת חוגים  </Link></li>

//         </ul>
//       </nav>
//     <Routes>
//       <Route path="home" element={<Home />}></Route>
//       <Route path="login" element={<Login />}></Route>    
//       <Route path="details" element={<Details />}></Route>
//       <Route path="courseList/:name" element={<CourseList/>}><Route path="details/:code" element={<Details />}></Route></Route>
//       <Route path="courseList" element={<CourseList/>}><Route path="details/:code" element={<Details />}></Route></Route>

//     </Routes>
//   </BrowserRouter> */}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import ProductList from './components/finalProject/screens/product/ProductList';
import Login from './components/finalProject/screens/user/Login';
import SignUp from './components/finalProject/screens/user/SignUp';
import ProductToAdd from './components/finalProject/screens/product/ProductToAdd';
import ShoppingCart from './components/finalProject/screens/order/ShoppingCart';
import Navbar from './components/finalProject/navs/NavBar';
import AddOrder from './components/finalProject/screens/order/AddOrder'
import Orders from './components/finalProject/screens/order/Orders';
import UsersForAdmin from './components/finalProject/screens/user/UsersForAdmin';
import AddUpdateProduct from './components/finalProject/screens/product/AddUpdateProduct'


function App() {
  return (   
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>       
       <Routes>
          <Route path='/' element={<ProductList/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/products' element={<ProductList/>}></Route> 
          <Route path='/signup' element={<SignUp/>}></Route>  
          <Route path='/productToAdd' element={<ProductToAdd/>}></Route> 
          <Route path='/shoppingCart' element={<ShoppingCart show='false'/>}></Route>
          <Route path='/addOrder' element={<AddOrder />}></Route> 
          <Route path='/orders' element={<Orders />}></Route>  
          <Route path='/users' element={<UsersForAdmin />}></Route>       
          <Route path='/addupdateproduct' element={<AddUpdateProduct />}></Route>       
        </Routes>
        </BrowserRouter>   
    </div>    
  );
}

export default App;

