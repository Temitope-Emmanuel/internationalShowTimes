import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NavMotion from '../layout/NavMotion';
import MainLayout from '../layout/MainLayout';
import Redirect from '../views/Redirect';

const AuthLogin = lazy(() => import('../views/Login'));
const TableBasic = lazy(() => import('../views/Tables/TableBasic'));

const Price = lazy(() => import('../views/Application/Price/Price2'));

const DashboardRoute = () => {
    const { path } = useRouteMatch();

    return (
        <MainLayout>
            <Route
                render={({ location }) => (
                    <Switch location={location} key={location.pathname}>
                        <NavMotion>
                            <Route path={`${path}/`} component={TableBasic} />
                            <Route exact path={`${path}/redirect`} component={Redirect} />
                            {/*
                        <Route path="/application/forgot-password" component={Price} />
                        <Route path="/forgot-password" component={Price} />
                        <Route path="/pages/error/error1" component={Price} />
                        <Route path="/pages/error/error2" component={Price} />
                        <Route path="/pages/comingsoon" component={Price} />
    
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/multi-language" component={MultiLanguage} />
                        <Route path="/rtl" component={RtlLayout} />
                        <Route path="/utils/util-icons" component={UtilsIcons} />
    
                        <Route path="/widget/statistic" component={Price} />
                        <Route path="/widget/data" component={Price} />
                        <Route path="/widget/chart" component={Price} />
                        <Route path="/user/account" component={Price} />
                        <Route path="/user/card" component={Price} />
                        <Route path="/user/list" component={Price} />
                        <Route path="/user/profile" component={Price} />
                        <Route path="/user/socialprofile" component={Price} />
                        <Route path="/application/ecommerce/account" component={Price} />
                        <Route path="/application/ecommerce/product" component={Price} />
                        <Route path="/application/ecommerce/customerlist" component={Price} />
                        <Route path="/application/ecommerce/orderlist" component={Price} />
                        <Route path="/application/ecommerce/orderdetails" component={Price} />
                        <Route path="/application/ecommerce/addproduct" component={Price} />
                        <Route path="/application/ecommerce/productreview" component={Price} />
                        <Route path="/application/contacts/list" component={Price} />
                        <Route path="/application/contacts/card" component={Price} />
                        <Route path="/application/mail" component={Price} />
                        <Route path="/application/chat" component={Price} />
                        <Route path="/application/price/price1" component={Price} />
                        <Route path="/application/price/price2" component={Price} />
                        <Route path="/application/price/price3" component={Price} />
                        <Route path="/basic/accordion" component={Price} />
                        <Route path="/basic/avatar" component={Price} />
                        <Route path="/basic/badges" component={Price} />
                        <Route path="/basic/breadcrumb" component={Price} />
                        <Route path="/basic/cards" component={Price} />
                        <Route path="/basic/chip" component={Price} />
                        <Route path="/basic/list" component={Price} />
                        <Route path="/basic/tabs" component={Price} />
                        <Route path="/advance/alert" component={Price} />
                        <Route path="/advance/dialog" component={Price} />
                        <Route path="/advance/pagination" component={Price} />
                        <Route path="/advance/progress" component={Price} />
                        <Route path="/advance/rating" component={Price} />
                        <Route path="/advance/snackbar" component={Price} />
                        <Route path="/advance/speeddial" component={Price} />
                        <Route path="/advance/timeline" component={Price} />
                        <Route path="/advance/toggle-button" component={Price} />
                        <Route path="/advance/treeview" component={Price} />
                        <Route path="/forms/frm-autocomplete" component={Price} />
                        <Route path="/forms/frm-button" component={Price} />
                        <Route path="/forms/frm-checkbox" component={Price} />
                        <Route path="/forms/frm-datetime" component={Price} />
                        <Route path="/forms/frm-listbox" component={Price} />
                        <Route path="/forms/frm-radio" component={Price} />
                        <Route path="/forms/frm-select" component={Price} />
                        <Route path="/forms/frm-slider" component={Price} />
                        <Route path="/forms/frm-switch" component={Price} />
                        <Route path="/forms/frm-text-field" component={Price} />
                        <Route path="/mui-datatables/mui-simple" component={Price} />
                        <Route path="/mui-datatables/mui-column-filters" component={Price} />
                        <Route path="/mui-datatables/mui-column-options-update" component={Price} />
                        <Route path="/mui-datatables/mui-component-edit" component={Price} />
                        <Route path="/mui-datatables/mui-column-sort" component={Price} />
                        <Route path="/mui-datatables/mui-csv-export" component={Price} />
                        <Route path="/mui-datatables/mui-custom-action-button" component={Price} />
                        <Route path="/mui-datatables/mui-custom-components" component={Price} />
                        <Route path="/mui-datatables/mui-customize-columns" component={Price} />
                        <Route path="/mui-datatables/mui-customize-filter" component={Price} />
                        <Route path="/mui-datatables/mui-draggable-columns" component={Price} />
                        <Route path="/mui-datatables/mui-expandable-rows" component={Price} />
                        <Route path="/mui-datatables/mui-fixed-header" component={Price} />
                        <Route path="/mui-datatables/mui-resizable-columns" component={Price} />
                        <Route path="/mui-datatables/mui-selectable-rows" component={Price} />
                        <Route path="/utils/util-modal" component={Price} />
                        <Route path="/utils/util-tooltip" component={Price} />
                        <Route path="/utils/util-popover" component={Price} />
                        <Route path="/utils/util-popper" component={Price} />
                        <Route path="/utils/util-transitions" component={Price} />
    
                        <Route path="/sample-page" component={Price} /> */}
                        </NavMotion>
                    </Switch>
                )}
            />
        </MainLayout>
    );
};

export default DashboardRoute;
