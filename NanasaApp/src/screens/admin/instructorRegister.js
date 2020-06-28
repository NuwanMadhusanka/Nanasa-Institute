/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const registerSchema = yup.object({
    Name: yup.string().
        required(),
    TelNumber: yup.string().
        required(),
    Email: yup.string()
        .required().
        email(),
    Subject: yup.string().
        required(),
})



export default function InstructorRegister({ navigation }) {




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>

                <View style={styles.formBox}>

                    <Formik
                        initialValues={{ Name: '', TelNumber: '', Email: '', Subject: '' }}
                        validationSchema={registerSchema}
                        onSubmit={(values, actions) => {
                            //actions.resetForm();
                            //login(values);
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

                                <TextInput
                                    style={globalStyles.input}
                                    placeholder='Subject'
                                    onChangeText={props.handleChange('Subject')}
                                    values={props.values.Subject}
                                    onBlur={props.handleBlur('Subject')}
                                />
                                <Text style={globalStyles.errorText}>{props.touched.Subject && props.errors.Subject}</Text>

                                <FlatButton text="Register" onPress={props.handleSubmit} />
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
    formBox: {
        marginTop: 40
    }
});