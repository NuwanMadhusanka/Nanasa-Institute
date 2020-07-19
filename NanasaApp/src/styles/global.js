/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    inputDescription: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 2,
        fontSize: 18,
        borderRadius: 6,
        height: 150
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    },
    titleText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#333',
    },
});