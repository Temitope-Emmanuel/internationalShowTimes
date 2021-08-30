import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {User} from "../../utils/user"
import { Card, CardContent,Button, Divider, Typography, makeStyles, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Logo from './../../assets/images/logo-dark.svg';
import useAlertService from '../../utils/alertContext';

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
        paddingLeft: '16px',
    },
    margin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory()
    const alert = useAlertService()
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
   
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value)
    }
    const handleSubmit = () => {
        User.find({email,password}).then(response => {
            history.push(`/dashboard/${response.body.user.id}/home`)
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
                                            Login
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            To keep connected with us.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <RouterLink to="/" className={classes.icon}>
                                            <img alt="Auth method" src={Logo} />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
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
                                <TextField value={password}
                                    fullWidth onChange={handlePasswordChange}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    type="password"
                                    defaultValue=""
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handleSubmit}>
                                    Login with Dropbox
                                </Button>
                            </Grid>
                            <Divider />
                            <Grid container justify="flex-start" className={classes.margin}>
                                <Grid item style={{ display: 'flex', alignItems: 'center' }} dir="row">
                                    <Typography
                                        variant="subtitle2"
                                        color="secondary"
                                        component={Link}
                                        to="/register"
                                        className={classes.forgot}
                                    >
                                        Register
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

export default Login;
