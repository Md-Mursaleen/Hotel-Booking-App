import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { data } from "../data/HotelsData";
import Feather from "react-native-vector-icons/Feather";
import SearchResults from "../components/SearchResults";

const SearchScreen = () => {
    const [textInput, setTextInput] = useState("");
    return (
        <SafeAreaView style={{ marginTop: 40 }}>
            <View style={styles.headerContainer}>
                <TextInput value={textInput}
                    onChangeText={(value) => setTextInput(value)}
                    placeholder="Enter your Destination" />
                <Feather name="search" size={24} color="black" />
            </View>
            <SearchResults textInput={textInput} setTextInput={setTextInput} data={data} />
        </SafeAreaView>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 4,
        borderColor: "#ffc727",
        borderRadius: 10
    }
});