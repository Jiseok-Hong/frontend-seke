import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import ScrollToTop from 'components/ScrollToTop';
import NewRouter from 'containers/NewRouter';
import OldRouter from 'containers/OldRouter';
import RoutePaths from 'config/RoutePaths';

const AppRouter = () => (
    <BrowserRouter>
        <ScrollToTop />
        <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            {/* <Route exact path={RoutePaths.LoginPath} component={Login} /> */}
            <Route exact path="/" render={() => <NewRouter basePath="/" />} />
            <Route path="/old" render={() => <OldRouter basePath="/old" />} />

            <Redirect from="*" to="/" />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
