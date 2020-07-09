/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';


export default function AdminHome({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [instructors, setIntructors] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Instructor')
            .onSnapshot(querySnapshot => {

                const instructors = [];

                querySnapshot.forEach(documentSnapshot => {
                    let userId = documentSnapshot.data().userId;
                    let instructorId = documentSnapshot.data().instructorId;
                    let subject = documentSnapshot.data().subject;
                    const subscriber = firestore()
                        .collection('User')
                        .doc(userId)
                        .onSnapshot(querySnapshotUser => {


                            instructors.push({
                                nameWithInital: querySnapshotUser.data().nameWithInitial,
                                contactNumber: querySnapshotUser.data().contactNumber,
                                subject: subject,
                                key: instructorId,
                            });

                            setLoading(false);
                            setIntructors(instructors);
                            console.log(instructors);

                        });

                    // Unsubscribe from events when no longer in use
                    return () => subscriber();
                });
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    const instructorRegister = () => {
        navigation.navigate('InstructorRegister');
    };

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View styles={styles.container}>
            <ScrollView>
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
                                        <Text style={globalStyles.titleText}>Name  :{item.nameWithInital}</Text>
                                        <Text style={globalStyles.titleText}>Tel       :{item.contactNumber}</Text>
                                        <Text style={globalStyles.titleText}>Sub      :{item.subject}</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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