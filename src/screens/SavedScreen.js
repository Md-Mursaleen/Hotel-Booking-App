import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SavedScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Saved Places",
            headerStyle: {
                height: 110,
                backgroundColor: "#003580",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 80,
                marginTop: 17,
                fontSize: 20,
                fontWeight: "bold",
                color: "white"
            },
            headerLeft: () => (
                <Ionicons name="arrow-back" size={28} color="white" style={{ marginLeft: 12, marginTop: 17 }} onPress={() => navigation.goBack()} />
            )
        });
    }, []);
    return (
        <View>

        </View>
    );
}

export default SavedScreen;

const styles = StyleSheet.create({
});