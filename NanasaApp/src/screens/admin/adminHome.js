/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';


export default function AdminHome({ navigation }) {


    useEffect(() => {
        firestore()
            .collection('Instructor')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('Instructor ID: ', documentSnapshot.id, documentSnapshot);
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().userId);
                });
            });
    });



    const [instructors, setIntructors] = useState([
        { nameWithInital: 'D.M Nuwan', subject: 'Maths', contactNumber: '0773015590', key: '1' },
        { nameWithInital: 'D.M Nuwan', subject: 'Maths', contactNumber: '0773015590', key: '2' },
        { nameWithInital: 'D.M Nuwan', subject: 'Maths', contactNumber: '0773015590', key: '3' },
    ]);

    const instructorRegister = () => {
        navigation.navigate('InstructorRegister');
    };

    return (
        <View styles={styles.container}>
            <Icon
                name='add'
                size={24}
                style={styles.instructorToggle}
                onPress={instructorRegister}
            />

            <FlatList
                data={instructors}
                renderItem={({ item }) => (
                    <TouchableOpacity >
                        <Card>
                            <View style={styles.card}>
                                <View style={styles.image}>
                                    <Avatar
                                        size="large"
                                        rounded
                                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nanasa-project.appspot.com/o/UserProfileImage%2Fdefault.png?alt=media&token=b9aefa06-2472-4ccd-b023-ef08ea77c475' }}
                                    />
                                </View>
                                <View>
                                    <Text style={globalStyles.titleText}>{item.nameWithInital}</Text>
                                    <Text style={globalStyles.titleText}>{item.contactNumber}</Text>
                                    <Text style={globalStyles.titleText}>{item.subject}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        margin: 30
    },
    text: {
        backgroundColor: 'green',
        fontSize: 15
    },
    instructorToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    card: {
        flexDirection: 'row',
    },
    image: {
        marginRight: 40
    }
});