/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Card from '../../shared/card';




const fileUpload = yup.object({
    Title: yup.string('').
        required('Title required'),
    Description: yup.string().
        required('Description required')
});



export default function InstructorNotesUpdate({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState('');

    useEffect(() => {
        firestore()
            .collection('Instructor')
            .doc(navigation.getParam('instructorId'))
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    let notes = documentSnapshot.data().note;
                    let i = 0;
                    let index = navigation.getParam('index')
                    notes.forEach(element => {
                        if (index === i) {
                            setNote(element);
                        }
                    });
                }
            });
    });


    const updatedNote = ({ Title, Description }) => {
        setLoading(true);
        let instructorId = navigation.getParam('instructorId');
        firestore()
            .collection('Instructor')
            .doc(instructorId)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    let updatedNote = note;
                    updatedNote.title = Title;
                    updatedNote.description = Description;

                    let newNoteList = [];
                    let noteList = documentSnapshot.data().note;
                    let i = 0;
                    let index = navigation.getParam('index');
                    noteList.forEach(element => {
                        if (i === index) {
                            newNoteList.push(updatedNote);
                        } else {
                            newNoteList.push(element);
                        }
                        i++;
                    });

                    firestore()
                        .collection('Instructor')
                        .doc(instructorId)
                        .update({
                            note: newNoteList,
                        })
                        .then(() => {
                            setLoading(false);
                            console.log('Instructor notes updated!');
                            showMessage({
                                message: 'Updated successfully.',
                                type: 'success',
                            });
                            navigation.navigate('InstructorNote')
                        });
                }
            });
    }


    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={globalStyles.container}>

                    <Card>

                        <Formik
                            enableReinitialize
                            initialValues={{ Title: note.title, Description: note.description }}
                            validationSchema={fileUpload}
                            onSubmit={(values, actions) => {
                                actions.resetForm();
                                updatedNote(values);
                            }}
                        >

                            {(props) => (
                                <View>

                                    <TextInput
                                        style={globalStyles.input}
                                        onChangeText={props.handleChange('Title')}
                                        value={props.values.Title}
                                        onBlur={props.handleBlur('Title')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Title && props.errors.Title}</Text>

                                    <TextInput
                                        style={globalStyles.inputDescription}
                                        placeholder={note.description}
                                        onChangeText={props.handleChange('Description')}
                                        value={props.values.Description}
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