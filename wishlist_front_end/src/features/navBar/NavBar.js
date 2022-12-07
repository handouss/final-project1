import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';

import {wishlistResetStore} from '../wishlist/wishlistSlice'
import {productlistResetStore} from '../products/productlistSlice'


import { useNavigate } from "react-router-dom";


import {useAuth} from '../context/UseAuth'

import {selectedCurrency} from '../home/homeSlicer'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    flexGrow: 1,
    display:'flex',
  },
  nav: {
    backgroundColor: 'white',
  },
}));

export function NavBar(props) {
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const classes = useStyles();
    let auth = useAuth();

    const [currency, setCurrency] = useState("1");
    const [value, setValue] = useState("1");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.handleSelectedTab(newValue)
    };
    const handleChangeSelect = (event) => {
        setCurrency(event.target.value);
        if(event.target.value === "2") {
            dispatch(selectedCurrency("USD"))
        }
        if(event.target.value === "1") {
            dispatch(selectedCurrency("TND"))
        }
        if(event.target.value === "3") {
            dispatch(selectedCurrency("EURO"))
        }
    };

    const hanbleLogout = () => {
      dispatch(wishlistResetStore())
      dispatch(productlistResetStore())
      auth.signout(() => {
        navigate(`/login`, { replace: true })
    })
    }

    return (
        <Box className={classes.root}>
            <AppBar position="fixed" className={classes.nav}>
                <Toolbar>
                    <Box className={classes.tabs}>
                      <Tabs
                          value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary">
                          <Tab icon={<FavoriteBorderOutlinedIcon />} label="My Wishilists" value="1" />
                          
                          <Tab icon={<ListAltOutlinedIcon />} label="My Products" value="2" />
                      </Tabs>
                      
                    </Box>
                    <Box>
                      <Select
                        id="demo-simple-select"
                        value={currency}
                        onChange={handleChangeSelect}
                      >
                        <MenuItem value="1">TND</MenuItem>
                        <MenuItem value="2">USD</MenuItem>
                        <MenuItem value="3">EURO</MenuItem>
                      </Select>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                      >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                        <MenuItem onClick={hanbleLogout}>Logout</MenuItem>
                      </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
