import React from 'react'
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {selectedItemWishlist} from '../wishlist/wishlistSlice'
import {selectedItemProductlist} from '../products/productlistSlice'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export  function SiderBarItem({item, tab, index, selectedItem, handleSelectedItem}) {
    const classes = useStyles();
    const dispatch = useDispatch();



    const handleListItemClick = (event) => {
        handleSelectedItem(index);

        if(tab === "wishlist") {
            dispatch(selectedItemWishlist(item))
        }
        if(tab === "productlist") {
            dispatch(selectedItemProductlist(item))
        }
    };
    return (
        <div>
            <ListItem
                button
                selected={selectedItem === index}
                onClick={(event, index) => handleListItemClick(event)}
            >
                <ListItemText primary={item.name} />
            </ListItem>
            
        </div>
    )
}
