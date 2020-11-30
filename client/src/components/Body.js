import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import register from "./Auth/Register";
import login from "./Auth/Login";

function Body() {
    return (
        <div>
            
            <BrowserRouter>
            
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={register} />
        <Route exact path="/login" component={login} />
      </Switch>
    </BrowserRouter>
            
        </div>
    )
}

export default Body
