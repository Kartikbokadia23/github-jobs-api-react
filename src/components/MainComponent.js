import React, { Component } from "react";
import JobDetail from "./JobDetailComponent";
import Home from "./HomeComponent";
import { Switch, Route, withRouter } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

                <Switch>
                    <Route path='/home' component={Home} />
                    {/* <Redirect to="/home" /> */}
                    <Route path = '/job/:id' component={JobDetail} />
                </Switch>

        );
    }
}


export default withRouter(Main);