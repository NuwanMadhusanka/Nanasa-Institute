/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, AsyncStorage, PermissionsAndroid, Alert } from 'react-native';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { globalStyles } from '../../styles/global';
import RNFetchBlob from 'rn-fetch-blob';

export default function StudentHome() {

    const [instructorData, setInstructorData] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [userId, setUserId] = useState('');
    //const [isDataChange, setIsDataChange] = useState(true);

    useEffect(() => {
        getUserId();
        firestore()
            .collection('Student')
            .where('userId', '==', userId)
            .get()
            .then(students => {
                students.forEach(student => {
                    let instructorUid = student.data().instructorUserId;
                    getInstructorName({ 'instructorUid': instructorUid });
                    firestore()
                        .collection('Instructor')
                        .where('userId', '==', instructorUid)
                        .get()
                        .then(instructors => {
                            instructors.forEach(instructor => {
                                setInstructorData(instructor.data());
                            });
                        });

                });
            });
    });

    const getInstructorName = ({ instructorUid }) => {
        firestore()
            .collection('User')
            .doc(instructorUid)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setInstructorName(documentSnapshot.data().nameWithInitial);
                }
            });
    }

    const getUserId = async () => {
        try {
            let uid = await AsyncStorage.getItem('userId') || 'none';
            setUserId(uid);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        } return userId;
    };

    const downloadFile = ({ url, title }) => {
        console.log(url);
        (async () => {
            console.log(title);
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                actualDownload({ 'url': url, 'title': title });
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        })();
    };

    const actualDownload = ({ url, title }) => {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `${title}`,
                path: `${dirs.DownloadDir}/${title}.pdf`,
            },
        })
            .fetch('GET', url, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
            })
            .catch((e) => {
                console.log(e)
            });
    };



    return (
        <ScrollView>
            <View styles={styles.container}>
                <Text style={styles.title}>{instructorData.subject} : {instructorName}</Text>
                <FlatList
                    data={instructorData.note}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <Card>
                                <Text style={styles.mainSubTitle}>{item.title}</Text>
                                <View style={styles.listData}>
                                    <View>
                                        <TouchableOpacity>
                                            <Avatar
                                                onPress={() => { downloadFile({ 'url': item.url, 'title': item.title }) }}
                                                size="large"
                                                rounded
                                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nanasa-project.appspot.com/o/pdf_download.png?alt=media&token=b33653a1-b9a1-4513-a7f1-3ce6f8b864d5' }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: 15, width: 205 }}>
                                        <Text style={globalStyles.titleText}>{item.description}</Text>
                                    </View>
                                </View>

                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
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
    mainTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 30,
        color: 'grey',
    },
    mainSubTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    noteToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    listData: {
        flexDirection: "row",
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 5,
        color: 'grey',
    }
});