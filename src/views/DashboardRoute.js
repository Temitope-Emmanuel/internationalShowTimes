import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NavMotion from '../layout/NavMotion';
import MainLayout from '../layout/MainLayout';
import Redirect from '../views/Redirect';

const TableBasic = lazy(() => import('../views/Tables/TableBasic'));


const DashboardRoute = () => {
    const { path } = useRouteMatch();
    console.log("listening loud and clear")

    return (
        <MainLayout>
            <Route
                render={({ location }) => (
                    <Switch location={location} key={location.pathname}>
                        <NavMotion>
                            <Route path={`${path}/`} component={TableBasic} />
                            <Route exact path={`${path}/redirect`} component={Redirect} />
                        </NavMotion>
                    </Switch>
                )}
            />
        </MainLayout>
    );
};

export default DashboardRoute;
