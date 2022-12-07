import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { Link } from "react-router-dom";

import { login } from "./loginSlice";
import { useAuth } from "../context/UseAuth";

import { userLogin } from "./loginAPI";
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
  bgImg: {
    backgroundImage: `url(https://t4.ftcdn.net/jpg/02/93/81/95/360_F_293819580_VHjiDSAn70VQgm7CWfWm222XJpcsc0Sy.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    height: "1000px",
  },
  text: {
    

    borderRadius: "30%",
    marginLeft: "50%",
    marginTop: "-40%",
  },
  imgContainer: {
    height: "100px",
    width: "100px",
    marginLeft: "46%",
    marginBottom: "5%",
  },
  img: {
    height: "250px",
    width: "250px",
    border: "3px solid",
    marginBottom: "50px",
    marginTop: "40px",
    marginRight: "80%",
    borderRadius: "30%",
  },
  box: {
    height: "40%",
    width: "35%",
    border: "1px solid",
    marginLeft: "60%",
    marginTop: "0px",
  },
  span: {
    marginLeft: "10%",
    fontSize: "16px",
  },
  input: {
    width: "85%",
  },
  link: {
    
    marginLeft: "10%",
    marginTop: "0px",
    textDecoration: "none",
  },
  title: {
    fontWeight: "500",
    fontSize: "40px",
  },
  button: {
    margin: "10%",
  },
});

export function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsLoading(true)
    let data = {
      name: name,
      password: password,
    };
    try {
      let res = await userLogin(data);
      if (res.success) {
        dispatch(login(res.data));
        auth.signin(() => {
      setIsLoading(false)
      navigate(`/`, { replace: true });
    });
    }
    } catch (error) {
      setIsLoading(false)
      console.log(error.message);
    }
  };

  return (
    <Box className={classes.bgImg}>
      <Box>
        <Box>
          <img
            className={classes.img}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEi702iQ9vGRWkxzvIe-3fIhnyIQ-S06mcwg&usqp=CAU"
          />
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.box}
        >
          <Grid item xs={12}>
            <span className={classes.title}>Sign In</span>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              item
              xs={12}
            >
              <span className={classes.span}>Name</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              item
              xs={12}
            >
              <span className={classes.span}>Password</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                type="password"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              item
              xs={12}
            ></Grid>
          </Grid>
          {isLoading && <CircularProgress />}
          {!isLoading && <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>}

          
        </Grid>
      </Box>
      <Box className={classes.text}>
        
        <p style={{fontSize:"2rem"}}>
       
       
        <span style={{color: 'white', backgroundColor: 'lime',style:'bold'}}>Create your list of needs on my wishlist</span>{' '}
       
          
        <ul style={{
          listStyle: 'none'
        }}>
          <li>Add your product</li>
          <li>Create your own list</li>
          
          <li>To create an account</li>
        <u><Link className={classes.link} to="/signup" variant="body3">
          Click here
        </Link></u>
        </ul>
        
        </p>
      </Box>
    </Box>
  );
}
