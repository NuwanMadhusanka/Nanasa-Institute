/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Profile from '../screens/profile';

const DrawerNavigator = createDrawerNavigator({
    Profile: {
        screen: Profile,
    },
    Logout: {
        screen: Profile,
    }
});

export default DrawerNavigator;