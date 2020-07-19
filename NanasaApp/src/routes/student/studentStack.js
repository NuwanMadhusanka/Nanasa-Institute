/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import StudentHome from '../../screens/student/studentHome';
import { createAppContainer } from 'react-navigation';




const screens = {
    StudentHome: {
        screen: StudentHome,
        navigationOptions: {
            title: 'Notes'
        },
    },
}

const StudentStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(StudentStack);