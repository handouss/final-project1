import React, { useState, useEffect } from 'react'
import {NavBar} from '../navBar/NavBar'
import {Productlist} from '../products/Productlist'
import {Wishlist} from '../wishlist/Wishlist'
import { useSelector, useDispatch } from 'react-redux';


import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import {getWishlist} from '../wishlist/wishlistSlice'
import {getProducts} from '../products/productlistSlice'
import {wishlistGetByUser} from '../wishlist/wishlistAPI'
import {productsGetByUser} from '../products/productlistAPI'

import {fetchCurrencyRatio} from './homeAPI'
import {currencyRatio} from './homeSlicer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'left',
    alignItems: 'start',
    marginTop: '4%',
    display: 'block',
  },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={3}>
                <Typography display="flex" height="100vh" width="100vw">{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export function Home() {
    const classes = useStyles();
    const [value, setValue] = useState("1");
    const dispatch = useDispatch();

    const user = useSelector(state => state.user)
    const wish = useSelector(state => state.wishlist.item)
    const product = useSelector(state => state.productlist.item)

    const handleTab = (newValue) => {
        setValue(newValue)
    }

    const getRatios = async () => {
        try {
            let res = await fetchCurrencyRatio()
            if(res.success){
                dispatch(currencyRatio(res.rates))
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        getRatios()
    },[])

    useEffect(() => {
        fetchWishlist(user)
        fetchProdcts(user)
    }, [wish, product])

    const fetchWishlist = async (user) => {
        try {
            let res = await wishlistGetByUser(user._id,user.token)
            if(res.success) return  dispatch(getWishlist(res.data))

        } catch (error) {
            console.log(error.message)
        }

    }


    const fetchProdcts = async (user) => {
        try {

            let res = await productsGetByUser(user._id,user.token)
            if(res.success) return  dispatch(getProducts(res.data))
        } catch (error) {

            console.log(error.message)
        }
    }

    return (
        <Box className={classes.root}>

            <NavBar handleSelectedTab={handleTab} />
            <TabPanel  value={value} index="1">
                <Wishlist />
            </TabPanel>
            <TabPanel value={value} index="2">
                <Productlist />
            </TabPanel>

        </Box>
    )
}
