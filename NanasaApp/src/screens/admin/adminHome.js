import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function AdminHome() {
    return (
        <View styles={styles.container}>
            <Text styles={styles.text}>Admin</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        margin: 30
    },
    text: {
        backgroundColor: 'green',
        fontSize: 15
    }
});