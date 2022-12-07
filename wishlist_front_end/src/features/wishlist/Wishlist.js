import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

import {SideBar} from '../sideBar/SideBar'
import {Wish} from './Wish'

import {addWish, getWishsByUser} from './wishlistSlice'

import {wishlistCreate} from './wishlistAPI'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
        alignItems: 'start',

    },
    side: {
        // bordercoRight: '1px solid',
        color: 'black',
        height: '100%',
    },
    span: {
        marginTop: '5%',
        // marginLeft: '15%',
        fontSize: '16px'
    },
    input: {
        width: '100%',
        // marginLeft: '15%'
    },
    dialog: {
        height: '40%',
        width: '35%',
    },

}));



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

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


export function Wishlist() {
    const classes = useStyles();
    const [value, setValue] = useState("1");
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')

    let wishList = useSelector(state => state.wishlist.array)
    const user = useSelector(state => state.user)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClick = async () => {
        let data = {
            name: name,
            user: user._id,
        }
        try {
            let res = await wishlistCreate(data,user.token)

            if(res.success) {
                dispatch(addWish(res.data))
                setName('')
                handleClose()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div style ={{width: '100%'}}>
            <Grid container >
                <Grid item xs={12} sm={2}>
                    <Box >
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            <AddIcon />
                            Add wishlist
                        </Button>
                        <SideBar arrayList={wishList} tab="wishlist" />
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={9}>
                    <TabPanel  value={value} index="1">
                        <Wish />
                    </TabPanel>
                </Grid>
            </Grid>
            <Dialog maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add wishlist</DialogTitle>
                <DialogContent style={{height: '20vh', width: '25vw', justifyContent: 'center', alignItems: 'center'}}>
                    <Grid item xs={12}>

                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center" item xs={12}>
                            <span className={classes.span}>Name</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.input}
                                variant="outlined"
                                value={name}
                                onChange={event => setName(event.target.value)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClick} variant="contained" color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}
