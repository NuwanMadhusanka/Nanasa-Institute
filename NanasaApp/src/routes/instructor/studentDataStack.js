/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import StudentData from '../../screens/instructor/studentData';



const screens = {
    Student: {
        screen: StudentData,
        navigationOptions: {
            title: 'Student Details'
        }
    },
}

const InstructorVideoStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(InstructorVideoStack);