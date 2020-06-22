import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';

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
        if (email == 'admin@gmail.com') {
            navigation.navigate('Admin');
        } else if (email == 'instructor@gmail.com') {
            navigation.navigate('Instructor');
        } else if (email == 'student@gmail.com') {
            navigation.navigate('Student');
        } else {
            navigation.navigate('Login');
        }
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