/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({ navigation, title }) {

    const logOut = () => {
        deleteUserId();
        navigation.navigate('Login')
    }

    const deleteUserId = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userRole');
            await AsyncStorage.removeItem('userNic');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    return (

        <View style={styles.headerTitle}>
            <Text style={styles.headerText}>{title}</Text>
            {/* <Icon name="arrow-forward" size={20} style={styles.icon} onPress={logOut} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        //position: 'absolute',
        left: 220
    },
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10
    },
    headerTitle: {
        flexDirection: "row"
    }
});