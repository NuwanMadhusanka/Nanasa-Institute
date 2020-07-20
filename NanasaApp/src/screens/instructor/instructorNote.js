/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import Card from '../../shared/card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { globalStyles } from '../../styles/global';
import { Avatar } from 'react-native-elements';
import { PermissionsAndroid, Alert } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";




export default function InstructorNote({ navigation }) {

    //const [userId, setUserId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [userId, setUserId] = useState('');
    const [userNic, setUserNic] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState('');

    useEffect(() => {

        getUserId();
        firestore()
            .collection('Instructor')
            .where('userId', '==', userId)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty && querySnapshot.size === 1) {
                    let data = querySnapshot.docs[0].data();
                    setNotes(data.note);
                    setSubject(data.subject);
                    setInstructorId(querySnapshot.docs[0].id);
                }
            });

    });

    const getUserId = async () => {
        try {
            let uid = await AsyncStorage.getItem('userId') || 'none';
            let nic = await AsyncStorage.getItem('userNic') || 'none';
            setUserId(uid);
            setUserNic(nic);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        } return userId;
    }



    const noteAdd = () => {
        let data = { 'instructorId': instructorId, 'nic': userNic };
        navigation.navigate('InstructorNotesAdd', data);
    };

    const noteUpdate = ({ note }) => {
        let i = 0;
        let index = 0;
        notes.forEach(element => {
            if (element === note) {
                index = i;
            }
            i++;
        });

        let data = { 'instructorId': instructorId, 'nic': userNic, 'index': index };
        navigation.navigate('InstructorNotesUpdate', data);
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
    }

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
    }

    const deleteFile = ({ fileName }) => {
        (async () => {
            let path = `Notes/${userNic}/${fileName}`;
            console.log(path);
            const reference = storage().ref(path);
            reference
                .delete()
                .then(() => {
                    console.log(`${fileName}has been deleted successfully.`);
                    updateInstructorDocument({ 'fileName': fileName });
                })
                .catch((e) => console.log('error on image deletion => ', e));
        })();
    }

    const updateInstructorDocument = ({ fileName }) => {

        //get instructor data
        firestore()
            .collection('Instructor')
            .doc(instructorId)
            .get()
            .then(documentSnapshot => {
                console.log('Instructor exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    let data = documentSnapshot.data();
                    let notesList = [];
                    data.note.forEach(element => {
                        if (element.fileName !== fileName) {
                            notesList.push(element);
                        }
                    });


                    //update the document of instructor
                    firestore()
                        .collection('Instructor')
                        .doc(instructorId)
                        .update({
                            note: notesList,
                        })
                        .then(() => {
                            console.log('Instructor updated!');
                            showMessage({
                                message: 'Delete successfully.',
                                type: 'success',
                            });
                        });


                } else {
                    setLoading(false);
                }
            });

    }



    return (
        <View styles={styles.container}>
            <ScrollView>

                <Card>
                    <Text style={styles.mainTitle}>Notes ({subject})</Text>
                    <Icon
                        name='add'
                        size={24}
                        style={styles.noteToggle}
                        onPress={noteAdd}
                    />
                    <FlatList
                        data={notes}
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
                                            <View style={styles.listData}>
                                                <Icon
                                                    name='edit'
                                                    size={24}
                                                    style={styles.noteToggle}
                                                    onPress={() => noteUpdate({ 'note': item })}
                                                />
                                                <Icon
                                                    name='delete'
                                                    size={24}
                                                    style={styles.noteToggle}
                                                    onPress={() => deleteFile({ 'fileName': item.fileName })}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                    <FlashMessage position="top" />
                </Card>

            </ScrollView>
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
    mainTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
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
    }
});