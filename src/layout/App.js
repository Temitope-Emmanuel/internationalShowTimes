import React, { useState, useEffect } from 'react';

import { IntlProvider } from 'react-intl';

import { useSelector,useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './../themes';
import Routes from '../MainRouter';
import NavigationScroll from './NavigationScroll';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { DropBoxProvider } from '../utils/dropBoxContext';
import { AlertServiceProvider } from '../utils/alertContext';
import {getToken} from "../utils/auth"
import {User} from "../utils/user"
import * as ActionTypes from "../store/Auth/actions"

function loadLocaleData(locale) {
    switch (locale) {
        case 'fr':
            return import('./../compiled-lang/fr.json');
        case 'ro':
            return import('./../compiled-lang/ro.json');
        case 'zh':
            return import('./../compiled-lang/zh.json');
        default:
            return import('./../compiled-lang/en.json');
    }
}

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const App = () => {
    const dispatch = useDispatch()
    const customization = useSelector((state) => state.customization);
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(customization.locale).then((d) => {
            setMessages(d.default);
        });
    }, [customization]);
    
    const checkLoggedIn = async () => {
        dispatch({
            type:ActionTypes.IS_LOADING
        })
        const authToken = await getToken()
        if(authToken){
            const user = await User.verify(authToken)
            if(user){
                dispatch({
                    type:ActionTypes.LOGGED_IN,
                    payload:user
                })
                dispatch({
                    type:ActionTypes.NOT_LOADING
                })
            }
        }else{
            dispatch({
                type:ActionTypes.NOT_LOADING
            })
        }
    }
    useEffect(() => {
        checkLoggedIn()
    },[])

    return (
        <React.Fragment>
            {messages && (
                <AlertServiceProvider>
                    <DropBoxProvider>
                        <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
                            <CssBaseline />
                            <NavigationScroll>
                                <StylesProvider jss={jss}>
                                    <ThemeProvider theme={theme(customization)}>
                                        <Routes />
                                    </ThemeProvider>
                                </StylesProvider>
                            </NavigationScroll>
                        </IntlProvider>
                    </DropBoxProvider>
                </AlertServiceProvider>
            )}
        </React.Fragment>
    );
};

export default App;
