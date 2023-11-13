import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const HomeHeader = () => {
    const [selectedItem, setSelectedItem] = useState("stays");
    return (
        <View style={styles.container}>
            <Pressable onPress={() => setSelectedItem("stays")} style={[styles.itemContainer, selectedItem === "stays" && styles.itemContainerWithBorder]}>
                <Ionicons name="bed-outline" size={24} color="white" />
                <Text style={styles.textStyle}>Stays</Text>
            </Pressable>
            <Pressable onPress={() => setSelectedItem("flights")} style={[styles.itemContainer, selectedItem === "flights" && styles.itemContainerWithBorder]}>
                <Ionicons name="ios-airplane-outline" size={26} color="white" />
                <Text style={styles.textStyle}>Flights</Text>
            </Pressable>
            <Pressable onPress={() => setSelectedItem("car-rental")} style={[styles.itemContainer, selectedItem === "car-rental" && styles.itemContainerWithBorder]}>
                <Ionicons name="car-outline" size={26} color="white" />
                <Text style={styles.textStyle}>Car Rental</Text>
            </Pressable>
            <Pressable onPress={() => setSelectedItem("taxi")} style={[styles.itemContainer, selectedItem === "taxi" && styles.itemContainerWithBorder]}>
                <FontAwesome5 name="uber" size={26} color="white" />
                <Text style={styles.textStyle}>Taxi</Text>
            </Pressable>
        </View>
    );
}

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#003580"
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemContainerWithBorder: {
        padding: 8,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 25
    },
    textStyle: {
        marginLeft: 7,
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }
});