import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <div> Homepage </div>}
                ></Route>
                <Route exact path="*" render={() => <div> works </div>}></Route>
            </Switch>
        </Router>
    );
};
