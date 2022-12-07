import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


import Typography from '@material-ui/core/Typography';

import {SideBar} from '../sideBar/SideBar'
import {Product} from './Product'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
        alignItems: 'start',

    },
    side: {
        // bordercoRight: '1px solid',
        color: 'black',
        alignSelf: 'stretch',
        height: '85vh',
    }
    
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

export function Productlist() {
    const [value, setValue] = useState("1");
    const dispatch = useDispatch();
    const [mode, setMode] = useState('show');
    
    

    let productList = useSelector(state => state.productlist.array);

    


    const handleClick = () => {
        setMode('add')
    }
    const handleMode = (value) => {
        setMode(value)
    }
    return (
        <div style ={{width: '100%'}}>
            <Grid container> 
                <Grid  item xs={12} sm={2}>
                    <Box >
                        <Button variant="outlined" color="primary" onClick={handleClick}>
                            <AddIcon />
                            Add Product
                        </Button>
                        <SideBar arrayList={productList} tab="productlist" />
                    </Box>
                </Grid>
                
                <Divider orientation="vertical" flexItem />

                <Grid item xs={12} sm={9}>
                <TabPanel  value={value} index="1">
                    <Product mode={mode} handleMode={handleMode} />
                </TabPanel>
                </Grid>
            </Grid>

            
        </div>
    )
}
