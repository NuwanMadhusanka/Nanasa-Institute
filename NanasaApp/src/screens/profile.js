/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, AsyncStorage, ActivityIndicator, Button } from 'react-native';
import Card from '../shared/card';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import FlatButton from '../shared/button';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import * as RNFS from 'react-native-fs';


export default function Profile({ navigation }) {

    const [userId, setUserId] = useState('');
    const [userNic, setUserNic] = useState('');
    const [userRole, setUserRole] = useState('');
    const [nav, setNav] = useState('');

    const [userData, setUserData] = useState('');
    const [url, setUrl] = useState('https://firebasestorage.googleapis.com/v0/b/nanasa-project.appspot.com/o/UserProfileImage%2Fdefault.png?alt=media&token=b9aefa06-2472-4ccd-b023-ef08ea77c475');

    // const [fileName, setFileName] = useState('');
    // const [fileUri, setFileUri] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        getUserId();
        firestore()
            .collection('User')
            .doc(userId)
            .get()
            .then(documentSnapshot => {

                if (documentSnapshot.exists) {
                    setUserData(documentSnapshot.data());
                    setUrl(documentSnapshot.data().url);

                    let role = documentSnapshot.data().role;
                    if (role === 1) {
                        setUserRole('Admin');
                    } else if (role === 2) {
                        setUserRole('Instructor');
                    } else if (role === 3) {
                        setUserRole('Student');
                    } else {

                    }
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

    const profileUpdate = () => {
        navigation.navigate('ProfileUpdate');
    }

    const uploadImage = ({ fileUri }) => {
        setLoading(true);
        (async () => {
            console.log(fileUri);
            let nic = nic;
            const reference = storage().ref(`UserProfileImage/${nic}`);
            let dUri = decodeURI(fileUri);
            console.log('=================================');
            const task = reference.putFile(dUri);
            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            task.then((snapshot) => {
                console.log('Image uploaded to the bucket!');
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    updateUserProfile({ 'downLoadUrl': downloadURL });
                });
            });
        })();

    }

    const updateUserProfile = ({ downLoadUrl }) => {
        firestore()
            .collection('User')
            .doc(userId)
            .update({
                url: downLoadUrl,
            })
            .then(() => {
                console.log('User Image updated!');
                setLoading(false);
            });
    }



    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.image}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{ uri: url }}
                    />
                    <Text style={{ color: 'blue', alignSelf: "center" }}
                        onPress={async () => {
                            try {
                                const res = await DocumentPicker.pick({
                                    type: [DocumentPicker.types.images],
                                });
                                uploadImage({ 'fileUri': res.uri, 'fileName': res.name });

                            } catch (err) {
                                if (DocumentPicker.isCancel(err)) {
                                    // User cancelled the picker, exit any dialogs or menus and move on
                                } else {
                                    throw err;
                                }
                            }
                        }} >Edit Image</Text>
                </View>
                <View style={styles.profileData}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.data}>{userData.nameWithInitial}</Text>
                </View>
                <View style={styles.profileData}>
                    <Text style={styles.label}>NIC:</Text>
                    <Text style={styles.data}>{userData.nic}</Text>
                </View>
                <View style={styles.profileData}>
                    <Text style={styles.label}>Tel:</Text>
                    <Text style={styles.data}>{userData.contactNumber}</Text>
                </View>
                <View style={styles.profileData}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.data}>{userData.email}</Text>
                </View>
                <View style={styles.profileData}>
                    <Text style={styles.label}>Role:</Text>
                    <Text style={styles.data}>{userRole}</Text>
                </View>

                <FlatButton text="Edit" onPress={profileUpdate} />
            </Card>
            {loading ? <ActivityIndicator /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        marginTop: 40,
    },
    text: {
        backgroundColor: 'green',
        fontSize: 15
    },
    image: {
        alignSelf: 'center',
    },
    profileData: {
        flexDirection: 'row',
        marginLeft: 40,
        marginTop: 10
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 10,
    },
    data: {
        fontSize: 20,
    },
    card: {
        flex: 1
    }
});