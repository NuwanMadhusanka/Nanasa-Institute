/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import InstructorVideo from '../../screens/instructor/instructorVideo';
import InstructorVideosAdd from '../../screens/instructor/instructorVideoAdd';



const screens = {
    InstructorVideo: {
        screen: InstructorVideo,
        navigationOptions: {
            title: 'Video'
        }
    },
    InstructorVideosAdd: {
        screen: InstructorVideosAdd,
        navigationOptions: {
            title: 'Video Add'
        }
    }
}

const InstructorVideoStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(InstructorVideoStack);