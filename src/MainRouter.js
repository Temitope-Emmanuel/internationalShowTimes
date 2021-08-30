import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './component/Loader/Loader';
import NavMotion from './layout/NavMotion';
import MainLayout from './layout/MainLayout';
import MinimalLayout from './layout/MinimalLayout';
import DashboardRoute from "./views/DashboardRoute"
import PrivateRoute from "./component/PrivateRoute"
import { useSelector } from 'react-redux';

const AuthLogin = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));

const Price = lazy(() => import('./views/Application/Price/Price2'));

const DashboardDefault = lazy(() => import('./views/Dashboard/Default'));

const RtlLayout = lazy(() => import('./views/RtlLayout'));

const TableBasic = lazy(() => import('./views/Tables/TableBasic'));

const UtilsIcons = lazy(() => import('./views/Utils/Icons'));
const UtilsTypography = lazy(() => import('./views/Utils/Typography'));

const MultiLanguage = lazy(() => import('./views/MultiLanguage'));

const Routes = () => {
    const location = useLocation();
    const auth = useSelector(state => state.auth)
    
    console.log({auth})
    return (
        <AnimatePresence>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={`/login`} component={AuthLogin} />
                    <Route path={`/register`} component={Register} />
                    <Route path={[]}>
                        <MinimalLayout>
                            <Switch location={location} key={location.pathname}>
                                <NavMotion></NavMotion>
                            </Switch>
                        </MinimalLayout>
                    </Route>
                    <PrivateRoute isLoading={auth.loading} isAuthenticated={auth.isAuthenticated}
                     path="/dashboard" component={DashboardRoute} />
                    <Redirect to="/login" />
                    {/* <Route
                        path={[
                            '/register',
                            '/application/register',
                            '/forgot-password',
                            '/application/forgot-password',
                            '/application/login',
                            '/pages/error/error1',
                            '/pages/error/error2',
                            '/pages/comingsoon',

                            '/dashboard/default',
                            '/widget/statistic',
                            '/widget/data',
                            '/widget/chart',
                            '/rtl',
                            '/user/account',
                            '/user/card',
                            '/user/list',
                            '/user/profile',
                            '/user/socialprofile',
                            '/application/ecommerce/account',
                            '/application/ecommerce/addproduct',
                            '/application/ecommerce/product',
                            '/application/ecommerce/customerlist',
                            '/application/ecommerce/orderlist',
                            '/application/ecommerce/orderdetails',
                            '/application/ecommerce/productreview',
                            '/application/contacts/list',
                            '/application/contacts/card',
                            '/application/price/price1',
                            '/application/price/price2',
                            '/application/price/price3',
                            '/application/mail',
                            '/application/chat',
                            '/basic/accordion',
                            '/basic/avatar',
                            '/basic/badges',
                            '/basic/breadcrumb',
                            '/basic/cards',
                            '/basic/chip',
                            '/basic/list',
                            '/basic/tabs',
                            '/advance/alert',
                            '/advance/dialog',
                            '/advance/pagination',
                            '/advance/progress',
                            '/advance/rating',
                            '/advance/snackbar',
                            '/advance/speeddial',
                            '/advance/timeline',
                            '/advance/toggle-button',
                            '/advance/treeview',
                            '/forms/frm-autocomplete',
                            '/forms/frm-button',
                            '/forms/frm-checkbox',
                            '/forms/frm-datetime',
                            '/forms/frm-listbox',
                            '/forms/frm-radio',
                            '/forms/frm-select',
                            '/forms/frm-slider',
                            '/forms/frm-switch',
                            '/forms/frm-text-field',
                            '/tables/table-basic',
                            '/tables/dense-table',
                            '/tables/enhanced-table',
                            '/tables/data-table',
                            '/tables/customized-table',
                            '/tables/sticky-header-table',
                            '/tables/collapse-table',
                            '/mui-datatables/mui-simple',
                            '/mui-datatables/mui-column-filters',
                            '/mui-datatables/mui-column-options-update',
                            '/mui-datatables/mui-column-sort',
                            '/mui-datatables/mui-component-edit',
                            '/mui-datatables/mui-csv-export',
                            '/mui-datatables/mui-custom-action-button',
                            '/mui-datatables/mui-custom-components',
                            '/mui-datatables/mui-customize-columns',
                            '/mui-datatables/mui-customize-filter',
                            '/mui-datatables/mui-draggable-columns',
                            '/mui-datatables/mui-expandable-rows',
                            '/mui-datatables/mui-fixed-header',
                            '/mui-datatables/mui-resizable-columns',
                            '/mui-datatables/mui-selectable-rows',
                            '/utils/util-modal',
                            '/utils/util-tooltip',
                            '/utils/util-popover',
                            '/utils/util-popper',
                            '/utils/util-transitions',
                            '/utils/util-icons',
                            '/utils/util-typography',
                            '/sample-page',
                            '/multi-language',
                        ]}
                    >
                    </Route> */}
                </Switch>
            </Suspense>
        </AnimatePresence>
    );
};

export default Routes;
