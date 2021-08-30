import React from 'react';
import {useParams} from "react-router"
import { Typography } from '@material-ui/core';

import NavGroup from './NavGroup';
import menuItem from './../../../../menu-items';

const MenuList = () => {
    const params = useParams()
    const paramsAddedNavItems = menuItem(params)
    const navItems = paramsAddedNavItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });


    return navItems
};

export default MenuList;
