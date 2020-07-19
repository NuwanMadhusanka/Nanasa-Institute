/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { set } from 'react-native-reanimated';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../shared/card';




const fileUpload = yup.object({
    Title: yup.string().
        required('Title required'),
    Description: yup.string().
        required('Description required')
});



export default function InstructorVideosAdd({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileUri, setFileUri] = useState('');
    const [isFileSelect, setIsFileSelect] = useState(false);

    const uploadFile = ({ Title, Description }) => {
        setLoading(true);
        (async () => {
            let nic = navigation.getParam('nic');
            const reference = storage().ref(`Notes/${nic}/${fileName}`);
            let dUri = decodeURI(fileUri);
            //console.log(dUri);
            const task = reference.putFile(dUri);
            task.on('state_changed', taskSnapshot => {
                //console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            task.then((snapshot) => {
                console.log('Image uploaded to the bucket!');
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    updateInstructorDocument({ 'url': downloadURL, 'title': Title, 'description': Description });
                });
            });
        })();

    }

    const updateInstructorDocument = ({ url, title, description }) => {
        let instructorId = navigation.getParam('instructorId');
        if (instructorId !== '' && url !== '') {
            //get instructor data
            firestore()
                .collection('Instructor')
                .doc(instructorId)
                .get()
                .then(documentSnapshot => {
                    console.log('Instructor exists: ', documentSnapshot.exists);

                    if (documentSnapshot.exists) {
                        let data = documentSnapshot.data();
                        let videosList = [];
                        videosList = data.video;
                        let addVideo = { 'title': title, 'description': description, 'url': url, 'fileName': fileName };
                        videosList.push(addVideo);

                        //update the document of instructor
                        firestore()
                            .collection('Instructor')
                            .doc(instructorId)
                            .update({
                                video: videosList,
                            })
                            .then(() => {
                                setFileUri('');
                                setFileName('');
                                setLoading(false);
                                console.log('Instructor updated!');
                                showMessage({
                                    message: 'Save successfully.',
                                    type: 'success',
                                });
                            });


                    } else {
                        setLoading(false);
                        showMessage({
                            message: 'Not save successfully.',
                            type: 'danger',
                        });
                    }
                });
        } else {
            setLoading(false);
            showMessage({
                message: 'Not save successfully.',
                type: 'danger',
            });
        }
    }


    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={globalStyles.container}>

                    <Card>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonStyle}
                            onPress={async () => {
                                try {
                                    const res = await DocumentPicker.pick({
                                        type: [DocumentPicker.types.allFiles],
                                    });

                                    setFileUri(res.uri);
                                    setFileName(res.name);
                                } catch (err) {
                                    if (DocumentPicker.isCancel(err)) {
                                        // User cancelled the picker, exit any dialogs or menus and move on
                                    } else {
                                        throw err;
                                    }
                                }
                            }}>

                            <View style={styles.fileSelect}>
                                <Icon
                                    name='link'
                                    size={30}
                                />
                                <Text style={{ marginLeft: 10, fontSize: 19 }}>
                                    Select the file(Video)
                                 </Text>
                            </View>


                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'grey', height: 2, margin: 10 }} />
                        {isFileSelect ? <Text style={globalStyles.errorText}>Select the file</Text> : null}

                        {fileName ? <Text style={styles.fileName}>File Name: {fileName}</Text> : null}

                        <Formik
                            initialValues={{ Title: '', Description: '' }}
                            validationSchema={fileUpload}
                            onSubmit={(values, actions) => {
                                if (fileUri === '') {
                                    setIsFileSelect(true);
                                } else {
                                    setIsFileSelect(false);
                                    actions.resetForm();
                                    uploadFile(values);
                                }
                            }}
                        >

                            {(props) => (
                                <View>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Title'
                                        onChangeText={props.handleChange('Title')}
                                        values={props.values.Title}
                                        onBlur={props.handleBlur('Title')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Title && props.errors.Title}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Description'
                                        onChangeText={props.handleChange('Description')}
                                        values={props.values.Description}
                                        onBlur={props.handleBlur('Description')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Description && props.errors.Description}</Text>


                                    <FlatButton text="Save" onPress={props.handleSubmit} />
                                </View>

                            )}

                        </Formik>

                        <FlashMessage position="top" />
                    </Card>


                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: 'Sriracha-Regular'
    },
    formBox: {
        marginTop: 40
    },
    fileSelect: {
        flexDirection: 'row'
    },
    fileName: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 20
    }
});