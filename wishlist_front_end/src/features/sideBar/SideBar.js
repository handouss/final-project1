import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import {SiderBarItem} from './SiderBarItem'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
}));


export function SideBar({arrayList, tab}) {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState(null)

        
    const wish = useSelector(state => state.wishlist.item)
    const product = useSelector(state => state.productlist.item)
    

    useEffect(() => {
        
        if(tab === "wishlist" && arrayList !== []){
            let index = arrayList.map(p => p._id).indexOf(wish._id)
            setSelectedItem(index)
        }
        if(tab === "productlist"){
            let index = arrayList.map(p => p._id).indexOf(product._id)
            setSelectedItem(index)
        }
    }, [])

    
    const handleSelected = (value) => {
        setSelectedItem(value)
    }

    return (
        <div className={classes.root}>
                <Grid item xs={12}>
                    <List style={{maxHeight: '75vh', overflow: 'auto'}}>
                        {arrayList.map((item, index) => (
                        <div key={item._id}>
                            <SiderBarItem item={item} tab={tab} index={index} selectedItem={selectedItem} handleSelectedItem={handleSelected}/>
                        </div>
                        ))}
                    </List>
                </Grid>

        </div>
    )
}
