/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import InstructorPaper from '../../screens/instructor/instructorPaper';



const screens = {
    InstructorVideo: {
        screen: InstructorPaper,
        navigationOptions: {
            title: 'Paper'
        }
    },
}

const InstructorPaperStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(InstructorPaperStack);