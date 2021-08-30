import React from 'react';
import {useHistory} from "react-router-dom"
import { Card,Button, CardContent, Divider, Typography, makeStyles, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {User} from "../../utils/user"
import Logo from './../../assets/images/logo-dark.svg';
import  useAlertService  from '../../utils/alertContext';
import * as ActionType from "../../store/Auth/actions"
import {saveToken} from "../../utils/auth"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.black,
        height: '100vh',
        minHeight: '100%',
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    card: {
        overflow: 'visible',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
            width: '50%',
        },
        maxWidth: '475px',
        margin: '24px auto',
    },
    content: {
        padding: theme.spacing(5, 4, 3, 4),
    },
    forgot: {
        textDecoration: 'none',
        paddingLeft: '6px',
        color:"blue",
        transition:"textDecoration linear 3s",
        "&:hover":{
            textDecoration:"underline"
        }
    },
    margin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
}));

const Register = () => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const alert = useAlertService()
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [username,setUsername] = React.useState("")

    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value)
    }
    const handleUsernameChange = (e) => {
        setUsername(e.currentTarget.value)
    }

    const createNewUser = async () => {
        const newUser = new User({
            email,password,username
        })
        newUser.save().then(async response => {
            const {token,...data} = response
            saveToken(token)
            dispatch({
                type:ActionType.LOGGED_IN,
                payload:data
            })
            history.push(`/dashboard/${response.id}/home`)
            alert({
                type:"success",
                message:`Successfully Logged In`,
                title:"Credentials Valid"
            })
        }).catch(err => {
            alert({
                type:"error",
                message:`Unable to complete request:${err.message}`,
                title:"Something went wrong"
            })
        })
    }

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={11} sm={7} md={6} lg={4}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Grid container direction="column" spacing={2} justify="center">
                            <Grid item xs={12}>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Typography color="textPrimary" gutterBottom variant="h2">
                                            Register
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            To keep connected with us.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/" className={classes.icon}>
                                            <img alt="Auth method" src={Logo} />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <TextField value={email}
                                    fullWidth onChange={handleEmailChange}
                                    autoFocus
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    defaultValue=""
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth value={username}
                                        autoFocus onChange={handleUsernameChange}
                                        label="Username"
                                        margin="normal"
                                        name="email"
                                        type="email"
                                        defaultValue=""
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth value={password}
                                        label="Password" onChange={handlePasswordChange}
                                        margin="normal"
                                        name="password"
                                        type="password"
                                        defaultValue=""
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={createNewUser}>
                                    Register
                                </Button>
                            </Grid>
                            <Divider />
                            <Grid container justify="flex-start" className={classes.margin}>
                                <Grid item style={{display:"flex",alignItems:"center"}} dir="row" >
                                    <Typography>
                                        Already have an account ?
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="secondary"
                                        component={Link}
                                        to="/login"
                                        className={classes.forgot}
                                    >
                                        Login
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Register;