import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import withConnect from 'utils/withConnect';
import NotFoundPage from 'pages/NotFoundPage';
import RoutePaths from 'config/RoutePaths';
import { store } from '../../store';
import userActions from 'store/user/actions';
import globalActions from 'store/global/actions';

class OldRouter extends Component {
    render() {
        const { basePath } = this.props;
        return (
            <Switch>
                {Object.keys(RoutePaths.OldPaths).map((item, index) => {
                    return (
                        <Route
                            key={RoutePaths.OldPaths[item].name}
                            exact
                            path={`${RoutePaths.OldPaths[item].path}`}
                            component={RoutePaths.OldPaths[item].component}
                        />
                    );
                })}
                <Redirect
                    exact
                    from={basePath}
                    to={`${RoutePaths.OldPaths[Object.keys(RoutePaths.OldPaths)[0]].path}`}
                />
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}

export default withConnect()(withRouter(OldRouter));
