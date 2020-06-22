import { createStackNavigator } from 'react-navigation-stack';
import StudentHome from '../screens/student/studentHome';


const screens = {
    StudentHome: {
        screen: StudentHome,
        navigationOptions: {
            title: 'Student Home Page'
        }
    },
}

const StudentStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default StudentStack;