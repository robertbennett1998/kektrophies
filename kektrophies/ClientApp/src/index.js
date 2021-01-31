import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import KekTheme from './KekTheme';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, NoSsr } from '@material-ui/core';
import Helmet from "react-helmet"
import MessengerCustomerChat from 'react-messenger-customer-chat';
import './index.css'

window.IsDebug = true

document.getElementById('root').style.height = "100%";
ReactDOM.render(
  <NoSsr>
      <Helmet> 
        {/* {window.IsDebug ? <meta http-equiv="Content-Security-Policy" content="default-src *;  style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.facebook.com" /> : <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self'; script-src 'self' http://www.facebook.com" />}             */}
        <meta http-equiv="Content-Security-Policy" content="default-src *;  style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.facebook.com" />
        <title>K&EK Trophies</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <MuiThemeProvider theme={KekTheme}>
      <CssBaseline />
      <App />
      </MuiThemeProvider >    
    <MessengerCustomerChat pageId="284419335355375" appId="853491975475805" />
  </NoSsr>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
