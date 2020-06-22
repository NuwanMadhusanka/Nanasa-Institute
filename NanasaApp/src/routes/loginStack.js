import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AdminStack from './adminStack';
import InstructorStack from './instructorStack';
import StudentStack from './studentStack';
import Login from '../screens/login';



const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null //this will hide the header
        },
    },
    Admin: {
        screen: AdminStack
    },
    Instructor: {
        screen: InstructorStack
    },
    Student: {
        screen: StudentStack
    }
});


export default createAppContainer(LoginStack);
