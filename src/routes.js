import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Inicio}></Route>

            </Switch>
        </BrowserRouter>


        
    )

}
