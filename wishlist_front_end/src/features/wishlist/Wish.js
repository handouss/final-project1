import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import {deleteWhishById, updateWhishById} from './wishlistAPI'
import {productsGetByWish} from '../products/productlistAPI'

import {selectedItemWishlist, getWishProducts} from './wishlistSlice'

//594db725a01d54ba26bc4853cb93b5e5

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
        alignItems: 'start',

    },
    wish: {
        fontWeight: '500',
        fontSize: '20px',

    },
    delete: {
        color: 'red'
    },
    card: {
        width: '100%',
        border: '1px solid',
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

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    }));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



export function Wish() {
    const classes = useStyles();
    const wish = useSelector(state => state.wishlist.item)
    const user = useSelector(state => state.user)

    const arrayProduct = useSelector(state => state.wishlist.productsArray)
    const selectedCurrency = useSelector(state => state.home.selectedCurrency)
    const usdRatio = useSelector(state => state.home.usdRatio)
    const tndRatio = useSelector(state => state.home.tndRatio)


    const dispatch = useDispatch();
    const [value, setValue] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [name, setName] = useState(wish.name)
    const [open, setOpen] = useState(false)
    const [rows, setRows] = useState([])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = async () => {
        let data = {
            name : name,
            id: wish._id
        }
        let item= {
                _id: wish._id,
                name: wish.name,
            }
        try {
            let res = await updateWhishById(data,user.token)
            if(res.success){

                dispatch(selectedItemWishlist(item))
            }
            handleClose()
        } catch (error) {
            console.log(error.message)
        }
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        setValue(false)
        setName(wish.name)
        getProducts()
    }, [wish._id])

    useEffect(() => {
        const currentDatafile = arrayProduct?.filter((item) =>  item.status === value )
        setRows(currentDatafile)
    },[arrayProduct, value])

    const getProducts = async () => {
        try {
            let res = await productsGetByWish(wish._id,user.token)
            if(res.success){
                dispatch(getWishProducts(res.data))
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleCurrency = (product) => {
        if(selectedCurrency === 'EURO'){
            switch (product.currency){
                case 'USD': return (product.price / usdRatio).toFixed(2)
                case 'TND': return (product.price / tndRatio).toFixed(2)
                default: return product.price
            }
        }

        if(selectedCurrency === 'USD'){
            switch (product.currency){
                case 'EURO': return (product.price * usdRatio).toFixed(2)
                case 'TND': return (( usdRatio * product.price) / tndRatio).toFixed(2)
                default: return product.price
            }
        }

        if(selectedCurrency === 'TND'){
            console.log("hii")
            switch (product.currency){
                case 'USD': return ((tndRatio * product.price) / usdRatio).toFixed(2)
                case 'EURO': return (product.price * tndRatio).toFixed(2)
                default: return product.price
            }
        }
    }


    const handleDelete = async () => {
        let item= {
            _id: null,
            name: null,
            }
        try {
            let res = await deleteWhishById(wish._id,user.token)
            if(res.success) {
                dispatch(selectedItemWishlist(item))
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <div>
            {wish?._id != null ?  (
                <Box>
                    <Box mb={3}>
                        <Grid container mb={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={0}>
                                    <Grid className={classes.wish} item xs={12} sm={2}>
                                        {wish.name}
                                    </Grid>
                                    <Grid item xs={12} sm={8}></Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Button onClick={handleClickOpen}>
                                            <EditIcon /> Edit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Button className={classes.delete} onClick={handleDelete}>
                                            <DeleteOutlineIcon /> Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mb={3} className={classes.card}>
                        <Grid container>
                            <Grid className={classes.wish} item xs={12} sm={4}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary">
                                    <Tab  label="To buy" value={false} />
                                    <Tab  label="Bought" value={true} />
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Image</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell >Description</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                <TableCell align="left">{''}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">{row.status? <span>Bought</span>:<spans>To Buy</spans>}</TableCell>
                                <TableCell align="right">{handleCurrency(row)}</TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        rowsPerPageOptions={[5, 10]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>

                    <Dialog maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit wishlist</DialogTitle>
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
                </Box>
            ) : <span> Please Select a Wishlist</span>
            }

        </div>
    )
}
