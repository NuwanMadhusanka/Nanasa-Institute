/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import InstructorNotesAdd from '../../screens/instructor/instructorNotesAdd';
import { createAppContainer } from 'react-navigation';
import InstructorNote from '../../screens/instructor/instructorNote';
import InstructorNotesUpdate from '../../screens/instructor/instructorNoteUpdate';


const screens = {
    InstructorNote: {
        screen: InstructorNote,
        navigationOptions: {
            title: 'Notes'
        }
    },
    InstructorNotesAdd: {
        screen: InstructorNotesAdd,
        navigationOptions: {
            title: 'Notes Add'
        }
    },
    InstructorNotesUpdate: {
        screen: InstructorNotesUpdate,
        navigationOptions: {
            title: 'Notes Update'
        }
    }
}

const InstructorNoteStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: '#444',
        //headerStyle: { backgroundColor: 'eee', height: 60 }
    }
});

export default createAppContainer(InstructorNoteStack);