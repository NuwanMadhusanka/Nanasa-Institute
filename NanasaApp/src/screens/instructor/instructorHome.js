/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Card from '../../shared/card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { globalStyles } from '../../styles/global';
import { Avatar } from 'react-native-elements';
import { PermissionsAndroid, Alert } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';


export default function InstructorHome({ navigation }) {

    const [userId, setUserId] = useState('');
    const [instructorId, setInstructorId] = useState('');

    useEffect(() => {
        firestore()
            .collection('Instructor')
            .where('userId', '==', '6tvWFakqr1eZgoHNk9tE2e20u893')
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty && querySnapshot.size === 1) {
                    let data = querySnapshot.docs[0].data();
                    setNotes(data.note);
                    setInstructorId(querySnapshot.docs[0].id);
                }
            });

    });

    const [notes, setNotes] = useState([]);

    const getNotes = () => {
        let userId = navigation.uid;
    }

    const [papers, setPapers] = useState([
        { title: 'Zelda Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Gotta catch Them All(again)', rating: 4, body: 'lorem ipsum', key: '2' },
        { title: 'Not so "Final" Fantasy', rating: 3, body: 'lorem ipsum ', key: '3' },
    ]);

    const [videos, setVideoes] = useState([
        { title: 'Zelda Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Gotta catch Them All(again)', rating: 4, body: 'lorem ipsum', key: '2' },
        { title: 'Not so "Final" Fantasy', rating: 3, body: 'lorem ipsum ', key: '3' },
    ]);
    const [loading, setLoading] = useState(false);

    const noteAdd = () => {
        let uid = navigation.getParam('uid');
        let nic = navigation.getParam('nic');
        console.log(uid);
        let data = { 'instructorId': 'pow3uP9Z2FIEIvBHrHsC', 'nic': nic };
        navigation.navigate('InstructorNotesAdd', data);
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
            let path = `Notes/${navigation.getParam('nic')}/${fileName}`;
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
                    <Text style={styles.mainTitle}>Notes</Text>
                    <Icon
                        name='add'
                        size={24}
                        style={styles.noteToggle}
                        onPress={noteAdd}
                    />
                    <FlatList
                        data={notes}
                        keyExtractor={(item, index) => item.key}
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
                                                    onPress={noteAdd}
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
                </Card>


                <Card>
                    <Text style={styles.mainTitle}>Papers</Text>
                    <FlatList
                        data={papers}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <Card>
                                    <View>
                                        <Text>Nuwan</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Card>


                <Card>
                    <Text style={styles.mainTitle}>Videos</Text>
                    <FlatList
                        data={videos}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <Card>
                                    <View>
                                        <Text>Nuwan</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
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
    }
});