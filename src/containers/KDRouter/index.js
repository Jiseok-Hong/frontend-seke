import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import withConnect from 'utils/withConnect';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePaths from 'config/RoutePaths';
import { store } from '../../store';
import userActions from 'store/user/actions';
import globalActions from 'store/global/actions';

class KDRouter extends Component {
    render() {
        const { basePath } = this.props;
        return (
            <Switch>
                {Object.keys(RoutePaths.KDPaths).map((item, index) => {
                    return (
                        <Route
                            key={RoutePaths.KDPaths[item].name}
                            exact
                            path={`${RoutePaths.KDPaths[item].path}`}
                            component={RoutePaths.KDPaths[item].component}
                        />
                    );
                })}
                <Redirect exact from={basePath} to={`${RoutePaths.KDPaths[Object.keys(RoutePaths.KDPaths)[0]].path}`} />
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}

export default withConnect()(withRouter(KDRouter));
