/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Card from '../../shared/card';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function InstructorHome({ navigation }) {

    const [notes, setNotes] = useState([
        { title: 'Zelda Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Gotta catch Them All(again)', rating: 4, body: 'lorem ipsum', key: '2' },
        { title: 'Not so "Final" Fantasy', rating: 3, body: 'lorem ipsum ', key: '3' },
    ]);

    const [papers, setPapers] = useState([
        { title: 'Zelda Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Gotta catch Them All(again)', rating: 4, body: 'lorem ipsum', key: '2' },
        { title: 'Not so "Final" Fantasy', rating: 3, body: 'lorem ipsum ', key: '3' },
    ]);

    const [videos, setVideoes] = useState([
        { title: 'Zelda Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Gotta catch Them All(again)', rating: 4, body: 'lorem ipsum', key: '2' },
        { title: 'Not so "Final" Fantasy', rating: 3, body: 'lorem ipsum ', key: '3' },
    ]);
    const [loading, setLoading] = useState(false);

    const noteAdd = () => {
        navigation.navigate('InstructorNotesAdd');
    };


    return (
        <View styles={styles.container}>
            <ScrollView>

                <Card>
                    <Text style={styles.mainTitle}>Notes</Text>
                    <Icon
                        name='add'
                        size={24}
                        style={styles.noteToggle}
                        onPress={noteAdd}
                    />
                    <FlatList
                        data={notes}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <Card>
                                    <View>
                                        <Text>Nuwan</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Card>


                <Card>
                    <Text style={styles.mainTitle}>Papers</Text>
                    <FlatList
                        data={papers}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <Card>
                                    <View>
                                        <Text>Nuwan</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Card>


                <Card>
                    <Text style={styles.mainTitle}>Videos</Text>
                    <FlatList
                        data={videos}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <Card>
                                    <View>
                                        <Text>Nuwan</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Card>
            </ScrollView>
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
    },
    mainTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 30,
        color: 'grey',
    },
    noteToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
});