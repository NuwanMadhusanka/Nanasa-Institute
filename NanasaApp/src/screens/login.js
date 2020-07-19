/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import AdminNavigator from '../routes/admin/adminTabNavigation';
import InstructorNavigation from '../routes/instructor/instructorTabNavigation';
import StudentNavigation from '../routes/student/studentTabNavigation';
import StudentSignup from './student/studentSignup';

const loginSchema = yup.object({
    email: yup.string()
        .required().
        email(),
    password: yup.string()
        .required()
        .min(8),
})



export default function Login({ navigation }) {

    const [adminPage, setAdminPage] = useState(false);
    const [instructorPage, setInstructorPage] = useState(false);
    const [studentPage, setStudentPage] = useState(false);
    const [studentSignup, setStudentSignup] = useState(false);
    const [loginPage, setLoginPage] = useState(true);


    const login = ({ email, password }) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                //console.log(user.uid);

                firestore()
                    .collection('User')
                    .doc(user.uid)
                    .get()
                    .then(documentSnapshot => {
                        //console.log('User exists: ', documentSnapshot.exists);

                        if (documentSnapshot.exists) {
                            //console.log(documentSnapshot.data());
                            //console.log('User data: ', documentSnapshot.data().nameWithInitial);

                            var role = documentSnapshot.data().role;
                            var status = documentSnapshot.data().status;

                            var userId = user.uid;
                            var userNic = documentSnapshot.data().nic;
                            var userRole = documentSnapshot.data().role;

                            (async () => {
                                saveUserData(userId, userNic, userRole);
                            })();

                            if (status === 1) {
                                if (role === 1) {
                                    setAdminPage(true);
                                } else if (role === 2) {
                                    setInstructorPage(true);
                                } else if (role === 3) {
                                    setStudentPage(true);
                                } else {
                                    //navigation.navigate('Login');
                                }
                            } else {
                                console.log('Your account deactivated.');
                                showMessage({
                                    message: 'Your account deactivated.',
                                    type: 'danger',
                                });
                            }
                        } else {
                            console.log('Try again');
                            showMessage({
                                message: 'Try again.',
                                type: 'danger',
                            });
                        }
                    });
            })
            .catch(error => {
                console.log('Invalid credential');
                showMessage({
                    message: 'Invalid credentials.',
                    type: 'danger',
                });
            });
    }

    const saveUserData = async (userId, userNic, userRole) => {
        try {
            await AsyncStorage.setItem('userId', userId);
            await AsyncStorage.setItem('userNic', userNic);
            await AsyncStorage.setItem('userRole', userRole);
        } catch (error) {
            console.log(error.message);
        }
    };

    if (adminPage) {
        return (
            < AdminNavigator />);
    }
    if (instructorPage) {
        return (
            <InstructorNavigation />);
    }
    if (studentPage) {
        return (
            <StudentNavigation />
        );
    }
    if (studentSignup) {
        return (
            <StudentSignup />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
                <Text style={styles.title}>Nanasa</Text>

                <View style={styles.loginBox}>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={(values, actions) => {
                            //actions.resetForm();
                            login(values);
                        }}
                    >

                        {(props) => (
                            <View>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder='Email'
                                    onChangeText={props.handleChange('email')}
                                    values={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                />
                                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                                <TextInput
                                    style={globalStyles.input}
                                    placeholder='Password'
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    values={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                />
                                <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                                <FlatButton text="Login" onPress={props.handleSubmit} />
                            </View>

                        )}

                    </Formik>
                    <Text style={styles.signupLink} onPress={() => { setStudentSignup(true) }} >Student Signup</Text>
                </View>
                <FlashMessage position="bottom" />
            </View>
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
    loginBox: {
        marginTop: 60
    },
    signupLink: {
        alignSelf: "center",
        marginTop: 20,
        color: "blue"
    }
});