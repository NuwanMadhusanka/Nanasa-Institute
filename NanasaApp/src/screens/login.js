/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const loginSchema = yup.object({
    email: yup.string()
        .required().
        email(),
    password: yup.string()
        .required()
        .min(8),
})



export default function Login({ navigation }) {

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
                            if (status === 1) {
                                if (role === 1) {
                                    navigation.navigate('Admin');
                                } else if (role === 2) {
                                    navigation.navigate('Instructor');
                                } else if (role === 3) {
                                    navigation.navigate('Student');
                                } else {
                                    navigation.navigate('Login');
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

                </View>
                <FlashMessage position="top" />
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
    }
});