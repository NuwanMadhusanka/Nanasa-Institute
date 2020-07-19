/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { Avatar, Badge } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';


export default function AdminHome({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [instructors, setIntructors] = useState([]);
    var [isUpdateData, setIsUpdateData] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        if (isUpdateData) {
            getData()
        }
    });

    const getData = () => {
        firestore()
            .collection('Instructor')
            .onSnapshot(querySnapshot => {

                let instructorData = [];
                querySnapshot.forEach(documentSnapshot => {
                    let userId = documentSnapshot.data().userId;
                    let instructorId = documentSnapshot.data().instructorId;
                    let subject = documentSnapshot.data().subject;
                    firestore()
                        .collection('User')
                        .doc(userId)
                        .onSnapshot(querySnapshotUser => {


                            instructorData.push({
                                nameWithInital: querySnapshotUser.data().nameWithInitial,
                                contactNumber: querySnapshotUser.data().contactNumber,
                                status: querySnapshotUser.data().status,
                                url: querySnapshotUser.data().url,
                                subject: subject,
                                userId: userId,
                                key: instructorId,
                            });
                            setIntructors(instructorData);

                            setLoading(false);
                            setIsUpdateData(false);

                            //console.log(instructors);

                        });
                });
            });
    }

    const updateInstructorStatus = ({ userId, newStatus }) => {
        setLoading(true);
        firestore()
            .collection('User')
            .doc(userId)
            .update({
                status: newStatus,
            })
            .then(() => {
                console.log('Instructor status updated!');
                setIntructors([]);
                getData();
                setLoading(false);
            });
    }



    const instructorRegister = () => {
        navigation.navigate('InstructorRegister');
    };

    if (loading) {
        return (<ActivityIndicator />);
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
                                            source={{ uri: item.url }}
                                        />
                                    </View>
                                    <View>
                                        <Text style={globalStyles.titleText}>Name  :{item.nameWithInital}</Text>
                                        <Text style={globalStyles.titleText}>Tel       :{item.contactNumber}</Text>
                                        <Text style={globalStyles.titleText}>Sub      :{item.subject}</Text>
                                        <View style={styles.status}>
                                            <Text style={globalStyles.titleText}>Status:</Text>
                                            {item.status === 1 ?
                                                <Badge containerStyle={{ top: 4 }} value="Active" status="success" onPress={() => updateInstructorStatus({ 'userId': item.userId, 'newStatus': 0 })} />
                                                : <Badge containerStyle={{ top: 4 }} value="Deactive" status="error" onPress={() => updateInstructorStatus({ 'userId': item.userId, 'newStatus': 1 })} />}
                                        </View>

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
    },
    status: {
        flexDirection: "row"
    }
});