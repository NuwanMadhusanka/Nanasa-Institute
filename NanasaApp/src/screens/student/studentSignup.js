/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Picker, ScrollView, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { set, color } from 'react-native-reanimated';
import Login from '../login';


const registerSchema = yup.object({
    Name: yup.string().
        required('Name required'),
    Nic: yup.string().
        required('NIC required').
        matches(/^\d{9,9}[v,V]$/, 'Insert valid nic')
    ,
    TelNumber: yup.string().
        required('Telephone number required ').
        matches(/^\d{10,10}$/, 'Insert valid contact'),
    Email: yup.string()
        .required('Email required').
        email('Insert valid email'),
    Instructor: yup.string().
        required('Select instructor'),
})



export default function StudentSignup({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [instructorList, setInstructorList] = useState([{ 'name': '', 'id': '' }]);
    const [instructorItemLoad, setInstructorItemLoad] = useState(true);
    const [signupSuccess, setSignupSuccess] = useState(false);

    useEffect(() => {
        getInstructor();
    });

    const getInstructor = () => {
        if (instructorItemLoad) {
            firestore()
                .collection('User')
                // Filter results
                .where('role', '==', 2)
                .get()
                .then(querySnapshot => {
                    let list = [];
                    querySnapshot.forEach(user => {
                        list.push({
                            'name': user.data().nameWithInitial,
                            'uid': '' + user.id,
                        })
                    });
                    setInstructorList(list);
                    setInstructorItemLoad(false);
                });
        }
    }

    const registerStudent = ({ Name, Nic, Email, TelNumber, Instructor }) => {


        setLoading(true);

        auth()
            .createUserWithEmailAndPassword(Email, Nic)
            .then(({ user }) => {
                console.log('User account created & signed in!');
                //Register User
                firestore()
                    .collection('User')
                    .doc(user.uid)
                    .set({
                        userName: Name,
                        nameWithInitial: Name,
                        contactNumber: TelNumber,
                        nic: Nic,
                        role: 3,
                        status: 0,
                        email: Email,
                        url: 'https://firebasestorage.googleapis.com/v0/b/nanasa-project.appspot.com/o/UserProfileImage%2Fdefault.png?alt=media&token=b9aefa06-2472-4ccd-b023-ef08ea77c475'

                    })
                    .then(() => {
                        console.log('Student added!');

                        firestore()
                            .collection('Student')
                            .add({
                                instructorUserId: Instructor,
                                userId: user.uid,
                            })
                            .then(() => {
                                setLoading(false);
                                setSignupSuccess(true);
                                showMessage({
                                    message: 'Signup request successful.',
                                    type: 'success',
                                });
                            });
                    });
            })
            .catch(error => {
                setLoading(false);
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    showMessage({
                        message: 'That email address is already in use!',
                        type: 'danger',
                    });
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    showMessage({
                        message: 'That email address is invalid!',
                        type: 'danger',
                    });
                }

                //console.error(error);
            });
    }

    if (loading) {
        return <ActivityIndicator />;
    }

    if (signupSuccess) {
        return (<Login />);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={globalStyles.container}>
                    <Text style={globalStyles.titleText}>Student Signup Form</Text>
                    <View style={styles.formBox}>

                        <Formik
                            enableReinitialize
                            initialValues={{ Name: '', TelNumber: '', Email: '', Subject: '', Nic: '', Instructor: instructorList[0].uid }}
                            validationSchema={registerSchema}
                            onSubmit={(values, actions) => {
                                actions.resetForm();
                                registerStudent(values);
                            }}
                        >

                            {(props) => (
                                <View>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Name With Initial'
                                        onChangeText={props.handleChange('Name')}
                                        values={props.values.Name}
                                        onBlur={props.handleBlur('Name')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Name && props.errors.Name}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='NIC'
                                        onChangeText={props.handleChange('Nic')}
                                        values={props.values.Nic}
                                        onBlur={props.handleBlur('Nic')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Nic && props.errors.Nic}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        keyboardType='numeric'
                                        placeholder='Contact Number'
                                        onChangeText={props.handleChange('TelNumber')}
                                        values={props.values.TelNumber}
                                        onBlur={props.handleBlur('TelNumber')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.TelNumber && props.errors.TelNumber}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Email'
                                        onChangeText={props.handleChange('Email')}
                                        values={props.values.Email}
                                        onBlur={props.handleBlur('Email')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>

                                    <Text style={styles.instructorStyle}>Instructor:</Text>
                                    <Picker
                                        selectedValue={props.values.Instructor}
                                        style={{ height: 50, width: 200 }}
                                        onValueChange={props.handleChange('Instructor')}

                                    >
                                        {
                                            instructorList.map((x, i) => {
                                                return (<Picker.Item label={x.name} value={x.uid} />)
                                            })
                                        }
                                    </Picker>
                                    <Text style={globalStyles.errorText}>{props.touched.Instructor && props.errors.Instructor}</Text>

                                    <FlatButton text="Register" onPress={props.handleSubmit} />
                                </View>

                            )}

                        </Formik>

                    </View>
                    <FlashMessage position="top" />
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
    instructorStyle: {
        fontSize: 20,
        color: 'grey'
    }
});