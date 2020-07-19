/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import { Avatar, Badge } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function StudentData({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    var [isUpdateData, setIsUpdateData] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        if (isUpdateData) {
            getData();
        }
    });

    const getData = () => {
        firestore()
            .collection('User')
            .where('role', '==', 3)
            .get()
            .then(querySnapshot => {
                let studentData = [];
                querySnapshot.forEach(student => {
                    studentData.push({
                        'name': student.data().nameWithInitial,
                        'nic': student.data().nic,
                        'tel': student.data().contactNumber,
                        'status': student.data().status,
                        'url': student.data().url,
                        'userId': student.id,
                    });
                });
                setIsUpdateData(false);
                setStudents(studentData);
                //console.log(studentData)
            });
    };

    const updateStudentStatus = ({ userId, newStatus }) => {
        setLoading(true);
        firestore()
            .collection('User')
            .doc(userId)
            .update({
                status: newStatus,
            })
            .then(() => {
                console.log('Instructor status updated!');
                setLoading(false);
                getData();
            });
    }

    // const deleteStudent = ({ userId }) => {
    //     setLoading(true);
    //     firestore()
    //         .collection('Student')
    //         .where('userId', '==', userId)
    //         .get()
    //         .then(studetns => {
    //             studetns.forEach(student => {
    //                 let studentId = student.data().id;
    //                 console.log(studentId);
    //                 //delete student record
    //                 firestore()
    //                     .collection('Student')
    //                     .doc(studentId)
    //                     .delete()
    //                     .then(() => {
    //                         console.log('Student record deleted!');
    //                         //delete user Record
    //                         firestore()
    //                             .collection('User')
    //                             .doc(userId)
    //                             .delete()
    //                             .then(() => {
    //                                 console.log('User record deleted!');
    //                                 //delete firebase authentication record
    //                                 auth().currentUser.delete().then(function () {
    //                                     console.log('delete successful?');
    //                                 }).catch(function (error) {
    //                                     console.error({ error });
    //                                 });

    //                                 setLoading(false);
    //                                 getData();
    //                             });
    //                     });
    //             });
    //         });

    // }

    return (
        <View styles={styles.container}>
            <ScrollView>


                {/* <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> */}


                {loading ? <ActivityIndicator /> : null}

                <FlatList
                    data={students}
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
                                        <Text style={globalStyles.titleText}>Name  :{item.name}</Text>
                                        <Text style={globalStyles.titleText}>Tel       :{item.tel}</Text>
                                        <Text style={globalStyles.titleText}>Nic      :{item.nic}</Text>
                                        <View style={styles.status}>
                                            <Text style={globalStyles.titleText}>Status:</Text>
                                            {item.status === 1 ?
                                                <Badge containerStyle={{ top: 4 }} value="Active" status="success" onPress={() => updateStudentStatus({ 'userId': item.userId, 'newStatus': 0 })} />
                                                : <Badge containerStyle={{ top: 4 }} value="Deactive" status="error" onPress={() => updateStudentStatus({ 'userId': item.userId, 'newStatus': 1 })} />}
                                        </View>
                                        {/* <Icon
                                            name='delete'
                                            size={24}
                                            style={styles.noteToggle}
                                            onPress={() => deleteStudent({ 'userId': item.userId })}
                                        /> */}

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