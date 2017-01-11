import * as React from 'react';
import {render} from 'react-dom';
import configureStore from './configureStore'
import Root from './components/Root';

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

import {loadConfiguration} from './configLoader';

const store = configureStore();
console.log(process);

render(<div>waiting for configuration</div>, document.getElementById("root"));


loadConfiguration('./config.json').then(r=>{
    render(
        <Root store={store} />,
        document.getElementById("root")
    );
}).catch(r=>{
    render(
        <Root store={store} />,
        document.getElementById("root")
    );
    
})

