import React,{useEffect,  useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {productsCreate, updateProductById, deleteProductById} from './productlistAPI'
import {addProduct, selectedItemProductlist } from './productlistSlice'

const useStyles = makeStyles((theme) => ({
    card: {
        width: 'auto',
        height: window.innerHeight*0.35,
        border: '1px solid',
    },
    delete: {
        color: 'red'
    },
    text: {
        textAlign: 'left'
    },
    input: {
        width: '100%'
    },
    img: {
        height: '80px',
        width: '80px',
        border: '1px solid',
        // marginLeft: '43%',
        marginBottom: '5%',
        marginTop: '5%',
    },
    box: {
        height: window.innerHeight*1,
        width: "80%",
        border: '1px solid',
        marginLeft: '10%',
    },
}));

export function Product({mode, handleMode}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [wishSelected, setWishSelected] = useState(0);
    const [status, setStatus] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState(1);
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [imgURL, setImgURL] = useState();


    const wishList = useSelector(state => state.wishlist.array)
    const user = useSelector(state => state.user)
    const product = useSelector(state => state.productlist.item)

    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value)
    }

    const handleChangeWish = (event) => {
        setWishSelected(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };


    useEffect(() => {
        if(mode === 'add'){
            setName('')
            setImg()
            setDescription('')
            setPrice(0)
            setWishSelected(0)
            setStatus(false)
            setCurrency(1)
        }

        if(mode === 'show'){

            let index = wishList.map(p => p._id).indexOf(product.wish)
            if(index !== -1){
                setWishSelected(index)
            }
            setStatus(product.status)
        }

        if(mode === 'edit') {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setImg(product.img)
            if(product.currency === 'USD') {
                setCurrency(2)
            }
            if (product.currency === 'TND'){
                setCurrency(1)
            }

            if (product.currency === 'EURO'){
                setCurrency(3)
            }
            setStatus(product.status)

            let index = wishList.map(p => p._id).indexOf(product.wish)
            if(index !== -1){
                setWishSelected(index)
            }
        }
    }, [mode, product])

    const handleEdit = () => {
        handleMode('edit')
    }

    const handleClose = () => {
        handleMode('show')
    }

    const handleCreate = async () => {
        let data= {
            name: name,
            description: description,
            price: price,
            img: img,
            status: status ,
            currency: currency === 1 ? 'TND' : currency === 2 ? 'USD' : 'EURO',
            wish: wishList[wishSelected]._id,
            user: user._id,
            token: user.token
        }
        try {
            let res = await productsCreate(data)
            if(res.success){
                dispatch(addProduct(res.data))
                handleClose()

            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const handleUpdate = async () => {

        let data= {
            id: product._id,
            name: name,
            description: description,
            price: price,
            status: status ,
            currency: currency === 1 ? 'TND' : currency === 2 ? 'USD' : 'EURO',
            wish: wishList[wishSelected]._id,
            img: img,
            token: user.token
        }

        let item= {
            _id: product._id,
            name: name,
            description: description,
            price: price,
            img: img,
            status: status === 1 ? false : true,
            currency: currency === 1 ? 'TND' : currency === 2 ? 'USD' : 'EURO',
            wish: wishList[wishSelected]._id,
            user: user._id,
            token: user.token
        }
        try {
            let res = await updateProductById(data)
            if(res.success){
                dispatch(selectedItemProductlist(item))
                handleClose()

            }

        } catch (error) {
            console.log(error.message)
        }

    }

    const handleCapture = (event) => {



        if(event.target.files[0]) {

            let files = event.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                console.log('img   ', e.target.result)
                setImg(e.target.result)
            }
            setImgURL(URL.createObjectURL(event.target.files[0]));
        }
        console.log('imgURL   ', imgURL)
        console.log('img   ', img)
    };


    const handleDelete = async () => {

        let item= {
            _id: null,
            name : null,
            description: null,
            currency: null,
            price: null,
            status: null,
            img: null,
            wish: null,
        }
        try {
            let res = await deleteProductById(product._id,user.token)
            if(res.success) {
                dispatch(selectedItemProductlist(item))
            }
        } catch (error) {
            console.log(error.message)
        }


    }

    return (
        <Box>
            {mode === 'show' ?
                <Box>
                    {product?._id != null ?
                        <Box>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    {product.img != null ?

                                    <Box
                                        component="img"
                                        src={`${product.img}`}
                                        className={classes.card}
                                    /> :

                                    <Box
                                        component="div"
                                        className={classes.card}
                                    />
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container spacing={0}>
                                        <Grid style={{ display: "flex", justifyContent: "flex-start" }} item xs={12} sm={3}>
                                            <Box ml={2}>
                                                <span>{product.name}</span>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            <Button onClick={handleEdit}>
                                                <EditIcon /> Edit
                                            </Button>
                                            <Button className={classes.delete} onClick={handleDelete}>
                                                <DeleteOutlineIcon /> Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={8}>
                                            <Box ml={2} className={classes.text}>
                                                {product.description}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0} >
                                        <Grid item xs={12} sm={8}>
                                            <Box ml={2} className={classes.text}mt={5}>
                                                price: {product.price} {product.currency}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box mt={4}>
                                <Grid container>
                                    <Grid style={{ display: "flex", justifyContent: "flex-start" }} item xs={12} sm={3}>

                                        <FormControl variant="outlined" style={{width: '100%',}}>
                                            <InputLabel id="demo-simple-select-outlined-label">whishlist</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={wishSelected}
                                                disabled
                                                onChange={handleChangeWish}
                                                label="whishlist"
                                            >

                                            {wishList?.length>0 ?wishList.map((item, index) => (

                                                <MenuItem key={item._id} value={index}>{item.name}</MenuItem>
                                            )):
                                            <MenuItem> </MenuItem>

                                            }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box mt={1}>
                                <Grid container>
                                    <Grid style={{ display: "flex", justifyContent: "flex-start" }} item xs={12} sm={3}>

                                        <FormControl variant="outlined" style={{width: '100%',}}>
                                            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                disabled
                                                value={product.status}
                                                onChange={handleChangeStatus}
                                                label="Status"
                                            >
                                                <MenuItem value={false}>To buy</MenuItem>
                                                <MenuItem value={true}>Bought</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                </Box>
                            </Box>
                        </Box>
                    : <span> Please Select a Product</span>
                    }

                </Box>
                : <></>
            }
            {mode === 'add' ?
                <Box>
                    <h3>Add Product</h3>
                    <Box
                        component='div'
                        className={classes.box}
                        container
                    >

                        {img !== ''?
                            <Box
                                component="img"
                                src={img}
                                className={classes.img}
                            />:

                                    <Box
                                        component="div"
                                        className={classes.img}
                                    />
                                    }
                            <input
                                // accept="image/*"
                                className={classes.input}
                                id="icon-button-photo"
                                hidden
                                onChange={handleCapture}
                                type="file"
                            />
                            <label htmlFor="icon-button-photo">
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>

                        <Grid container spacing={1}>
                                <Grid item xl={12} sm={6} >
                                    <Box ml={2} >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Name</span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >
                                                <TextField className={classes.input} variant="outlined" value={name} onChange={event => setName(event.target.value)} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xl={12} sm={3} >
                                    <Box>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Price</span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >
                                                <TextField type="number" className={classes.input} variant="outlined" value={price} onChange={event => setPrice(event.target.value)} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xl={12} sm={3} >
                                    <Box mr={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >currency </span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >

                                                <FormControl variant="outlined" style={{width: '100%',}}>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={currency}
                                                        onChange={handleChangeCurrency}
                                                    >
                                                        <MenuItem value={1}>TND</MenuItem>
                                                        <MenuItem value={2}>USD</MenuItem>
                                                        <MenuItem value={3}>EURO</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid container>
                                <Grid item xl={12} sm={12} >
                                    <Box ml={2} mr={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Description</span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >
                                                <TextField
                                                    className={classes.input}
                                                    variant="outlined"
                                                    multiline
                                                    rows={4}
                                                    value={description}
                                                    onChange={event => setDescription(event.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                                <Grid item xl={12} sm={6} >
                                    <Box ml={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >whishlist </span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >

                                                <FormControl variant="outlined" style={{width: '100%',}}>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={wishSelected}
                                                        onChange={handleChangeWish}
                                                    >

                                                    {wishList?.length>0 ?wishList.map((item, index) => (

                                                        <MenuItem key={item._id} value={index}>{item.name}</MenuItem>
                                                    )):
                                                    <MenuItem> </MenuItem>

                                                    }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xl={12} sm={6} >
                                    <Box mr={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Status </span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >

                                                <FormControl variant="outlined" style={{width: '100%',}}>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={status}
                                                        onChange={handleChangeStatus}
                                                    >
                                                        <MenuItem value={false}>To Buy</MenuItem>
                                                        <MenuItem value={true}>Bought</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                        </Grid>
                        <Box mt={2} mr={2} >
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Box ml={2}>
                                    <Button onClick={handleClose} variant="outlined" color="primary">
                                        Cancel
                                    </Button>
                                </Box>
                                <Box ml={2}>
                                    <Button onClick={handleCreate} variant="contained" color="primary">
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                : <></>

            }
            {mode === 'edit' ?
                <Box>
                    <h3>Add Product</h3>
                    <Box
                        component='div'
                        className={classes.box}
                        container
                    >


                        {img !== ''?
                            <Box
                                component="img"
                                src={img}
                                className={classes.img}
                            />:

                                    <Box
                                        component="div"
                                        className={classes.img}
                                    />
                                    }
                            <input
                                // accept="image/*"
                                className={classes.input}
                                id="icon-button-photo"
                                hidden
                                onChange={handleCapture}
                                type="file"
                            />
                            <label htmlFor="icon-button-photo">
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        <Grid container spacing={1}>
                                <Grid item xl={12} sm={6} >
                                    <Box ml={2} >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Name</span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >
                                                <TextField className={classes.input} variant="outlined" value={name} onChange={event => setName(event.target.value)} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xl={12} sm={3} >
                                    <Box>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Price</span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >
                                                <TextField type="number" className={classes.input} variant="outlined" value={price} onChange={event => setPrice(event.target.value)} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xl={12} sm={3} >
                                    <Box mr={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >currency </span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >

                                                <FormControl variant="outlined" style={{width: '100%',}}>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={currency}
                                                        onChange={handleChangeCurrency}
                                                    >
                                                        <MenuItem value={1}>TND</MenuItem>
                                                        <MenuItem value={2}>USD</MenuItem>
                                                        <MenuItem value={3}>EURO</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid container>
                                <Grid item xl={12} sm={12} >
                                    <Box ml={2} mr={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Description</span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >
                                                <TextField
                                                    className={classes.input}
                                                    variant="outlined"
                                                    multiline
                                                    rows={4}
                                                    value={description}
                                                    onChange={event => setDescription(event.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                                <Grid item xl={12} sm={6} >
                                    <Box ml={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >whishlist </span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >

                                                <FormControl variant="outlined" style={{width: '100%',}}>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={wishSelected}
                                                        onChange={handleChangeWish}
                                                    >

                                                    {wishList?.length>0 ?wishList.map((item, index) => (

                                                        <MenuItem key={item._id} value={index}>{item.name}</MenuItem>
                                                    )):
                                                        <MenuItem> </MenuItem>

                                                    }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xl={12} sm={6} >
                                    <Box mr={2}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center" item xs={12}
                                        >
                                            <span >Status </span>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }} >

                                                <FormControl variant="outlined" style={{width: '100%',}}>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={status}
                                                        onChange={handleChangeStatus}
                                                    >
                                                        <MenuItem value={false}>To Buy</MenuItem>
                                                        <MenuItem value={true}>Bought</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                        </Grid>

                                <Box mt={2} mr={2} >
                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Box ml={2}>
                                            <Button onClick={handleClose} variant="outlined" color="primary">
                                                Cancel
                                            </Button>
                                        </Box>
                                        <Box ml={2}>
                                        <Button onClick={handleUpdate} variant="contained" color="primary">
                                            Save
                                        </Button>
                                        </Box>
                                    </Grid>
                                </Box>
                    </Box>
                </Box>

                : <></>

            }


        </Box>
    )
}
