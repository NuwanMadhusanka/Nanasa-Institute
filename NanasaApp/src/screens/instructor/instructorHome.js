import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function InstructorHome() {
    return (
        <View styles={styles.container}>
            <Text styles={styles.text}>Instructor</Text>
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