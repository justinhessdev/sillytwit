import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';
import Nav from './components/Navigate';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

/*
The element with id app is created in our index.html file
*/
ReactDOM.render(<Nav />, nav);
ReactDOM.render(<Layout />, app);
