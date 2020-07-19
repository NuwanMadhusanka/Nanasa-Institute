/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";



const registerSchema = yup.object({
    Name: yup.string().
        required('Name required'),
    TelNumber: yup.string().length(10, 'Insert valid contact number').
        required('Telephone number required '),
    Email: yup.string()
        .required('Email required').
        email('Insert valid email'),
    Password: yup.string().min(8, 'Atleast 8 character password').
        required('Password required'),
})



export default function ProfileUpdate({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState('');
    const [userDataLoad, setUserDataLoad] = useState(false);

    useEffect(() => {

        getUserId();
        firestore()
            .collection('User')
            .doc(userId)
            .get()
            .then(documentSnapshot => {

                if (documentSnapshot.exists) {
                    setUserData(documentSnapshot.data());
                    setUserDataLoad(true);
                }
            });

    });

    const getUserId = async () => {
        try {
            let uid = await AsyncStorage.getItem('userId') || 'none';
            setUserId(uid);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        } return userId;
    }

    const updateUser = ({ Name, TelNumber, Password }) => {
        //check password changed
        let isPasswordChanged = false;
        setLoading(true);
        Password.split('').forEach(character => {
            if (character !== '0') {
                isPasswordChanged = true;
            }
        });

        if (isPasswordChanged) {
            let user = auth().currentUser;
            user.updatePassword(Password).then(() => {
                console.log('Password updated!');
            }).catch((error) => { console.log(error); });
        }

        firestore()
            .collection('User')
            .doc(userId)
            .update({
                nameWithInitial: Name,
                contactNumber: TelNumber,
            })
            .then(() => {
                console.log('User updated!');
                setLoading(false);
                showMessage({
                    message: 'Account update successfully.',
                    type: 'success',
                });
            });

    }



    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={styles.formBox}>

                        <Formik
                            enableReinitialize
                            initialValues={{ Name: userData.nameWithInitial, TelNumber: userData.contactNumber, Email: userData.email, Password: '00000000', Nic: userData.nic }}
                            validationSchema={registerSchema}
                            onSubmit={(values, actions) => {
                                updateUser(values);
                                actions.resetForm();
                            }}
                        >

                            {(props) => (
                                <View>

                                    <TextInput
                                        style={globalStyles.input}
                                        onChangeText={props.handleChange('Name')}
                                        value={props.values.Name}
                                        onBlur={props.handleBlur('Name')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Name && props.errors.Name}</Text>


                                    <TextInput
                                        style={globalStyles.input}
                                        keyboardType='numeric'
                                        onChangeText={props.handleChange('TelNumber')}
                                        value={props.values.TelNumber}
                                        onBlur={props.handleBlur('TelNumber')}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.TelNumber && props.errors.TelNumber}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        onChangeText={props.handleChange('Email')}
                                        value={props.values.Email}
                                        onBlur={props.handleBlur('Email')}
                                        editable={false}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        onChangeText={props.handleChange('Nic')}
                                        value={props.values.Nic}
                                        onBlur={props.handleBlur('Nic')}
                                        editable={false}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Nic && props.errors.Nic}</Text>


                                    <TextInput
                                        style={globalStyles.input}
                                        onChangeText={props.handleChange('Password')}
                                        value={props.values.Password}
                                        onBlur={props.handleBlur('Password')}
                                        secureTextEntry={true}
                                    />
                                    <Text style={globalStyles.errorText}>{props.touched.Password && props.errors.Password}</Text>


                                    <FlatButton text="Save" onPress={props.handleSubmit} />
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
    }
});