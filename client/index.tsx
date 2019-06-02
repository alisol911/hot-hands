import './style/main.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {App} from './app';


render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
    document.getElementById('app')
);
