/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import Card from '../../shared/card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { globalStyles } from '../../styles/global';
import { Avatar } from 'react-native-elements';
import { PermissionsAndroid, Alert } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';




export default function InstructorPaper({ navigation }) {


    return (
        <View styles={styles.container}>
            <Text>Paper</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        margin: 30
    },
});