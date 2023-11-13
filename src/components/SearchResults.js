import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ textInput, setTextInput, data }) => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 10 }}>
            <FlatList data={data} renderItem={({ item }) => {
                if (item.place.toLowerCase().includes(textInput?.toLowerCase())) {
                    if (textInput === "") {
                        return null;
                    }
                    return (
                        <Pressable style={styles.itemContainer} onPress={() => {
                            setTextInput(item.place);
                            navigation.navigate("Home", {
                                userInput: item.place
                            });
                        }}>
                            <View>
                                <Image source={{ uri: item.placeImage }} style={styles.imageStyle} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.placeTextStyle}>{item.place}</Text>
                                <Text style={{ marginVertical: 4 }}>{item.shortDescription}</Text>
                                <Text style={styles.propertiesLengthTextstyle}>{item.properties.length} Properties</Text>
                            </View>
                        </Pressable>
                    );
                }
            }} />
        </View>
    );
}

export default SearchResults;

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    imageStyle: {
        height: 70,
        width: 70
    },
    placeTextStyle: {
        fontSize: 15,
        fontWeight: "500"
    },
    propertiesLengthTextstyle: {
        fontSize: 15,
        color: "grey"
    }
});