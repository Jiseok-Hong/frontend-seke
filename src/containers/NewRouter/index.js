import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import withConnect from 'utils/withConnect';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePaths from 'config/RoutePaths';
import { store } from '../../store';
import userActions from 'store/user/actions';
import globalActions from 'store/global/actions';

class DashboardRouter extends Component {
    render() {
        const { basePath } = this.props;
        return (
            <Switch>
                {Object.keys(RoutePaths.NewPaths).map((item, index) => {
                    return (
                        <Route
                            key={RoutePaths.NewPaths[item].name}
                            exact
                            path={`${RoutePaths.NewPaths[item].path}`}
                            component={RoutePaths.NewPaths[item].component}
                        />
                    );
                })}
                <Redirect
                    exact
                    from={basePath}
                    to={`${RoutePaths.NewPaths[Object.keys(RoutePaths.NewPaths)[0]].path}`}
                />
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}

export default withConnect()(withRouter(DashboardRouter));
