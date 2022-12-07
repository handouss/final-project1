import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { Link, useNavigate } from "react-router-dom";

import { userSignUp } from "./signUpAPI";
import { validateEmail } from "../../utils/function";

const useStyles = makeStyles({
  emailAdress: {
    marginLeft: "70px",
    marginTop: "10px",
  },
  bgImg: {
    backgroundImage: `url(https://t4.ftcdn.net/jpg/02/93/81/95/360_F_293819580_VHjiDSAn70VQgm7CWfWm222XJpcsc0Sy.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
    height: "1000px",
  },
  second:{
    height :"400px",
    width:"400px",
    marginRight:"30%",
  },
  img: {
    height: "200px",
    width: "200px",
    border: "3px solid",
    marginBottom:"50px",
    marginTop:"40px",
    marginLeft:"55%",
    borderRadius: "30%",
  },
  box: {
  
    height: "550px",
    width: "35%",
    border: "1px solid",
    marginLeft: "60%",
  },
  span: {
    marginTop: "10px",
    marginLeft: "10%",
    fontSize: "16px",
  },
  input: {
    width: "85%",
    paddingBlock:"-10%",
    backgroundColor:"white",
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

export function SignUp(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, showError] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verifEmail, setVerif] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorVerify, setErrorVerify] = useState("");

  const handleSignUp = async () => {
         showError(false)
        if (!validateEmail(email)) {
      return setErrorEmail("invalid");
    } else {
      setErrorEmail("");
      setErrorVerify("");
    }

    if (verifEmail !== email) {
      setErrorEmail("invalid");
      setErrorVerify("invalid");
      return;
    }

    setErrorEmail("");
    setErrorVerify("");

    let data = {
      name: name,
      password: password,
      email: email,
    };

    try {
      let res = await userSignUp(data);
      if(res.error){
        return showError(true)
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    return setEmail(event.target.value);
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
            <span className={classes.title}>Sign Up</span>
            
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
            >
              <span className={classes.emailAdress}>Adresse Email</span>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                type="email"
                variant="outlined"
                value={email}
                error={errorEmail}
                onChange={handleChange}
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
              <span className={classes.emailAdress}>
                Vérifier votre Adresse Email
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                type="email"
                variant="outlined"
                value={verifEmail}
                error={errorVerify}
                onChange={(event) => setVerif(event.target.value)}
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
              <Link className={classes.link} to="/login" variant="body2">
                Already have an account?
              </Link>
            </Grid>
          </Grid>

          {error && <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              item
              xs={12}
            >
              <span className={classes.link} style={{
                color: 'red'
              }}>
              Account already exists
              </span>
            </Grid>
          </Grid>}

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSignUp}
          >
            Sign up
          </Button>
        </Grid>
      </Box>
      
    </Box>
  );
}
