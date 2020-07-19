/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Profile from '../screens/profile';
import Login from '../screens/login';

const DrawerNavigator = createDrawerNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            drawerLabel: () => null,
        }
    },
    Profile: {
        screen: Profile,
    },
    Logout: {
        screen: Profile,
    }
});

export default createAppContainer(DrawerNavigator);