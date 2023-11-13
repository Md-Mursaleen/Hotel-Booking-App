import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Amenities = ({ margin }) => {
    const services = [
        {
            id: "0",
            name: "Room service"
        },
        {
            id: "2",
            name: "Free wifi"
        },
        {
            id: "3",
            name: "Family rooms"
        },
        {
            id: "4",
            name: "Free Parking"
        },
        {
            id: "5",
            name: "Swimming pool"
        },
        {
            id: "6",
            name: "Restaurant"
        },
        {
            id: "7",
            name: "Fitness center"
        }
    ];
    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.titleTextStyle}>Most Popular Facilities</Text>
            <View style={styles.contentContainer}>
                {services.map((service, index) => (
                    <View key={index} style={[styles.itemContainer, { margin: margin }]}>
                        <Text style={styles.itemNameTextStyle}>{service.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default Amenities;

const styles = StyleSheet.create({
    titleTextStyle: {
        fontSize: 17,
        fontWeight: "600"
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    itemContainer: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: "#007fff",
        borderRadius: 25
    },
    itemNameTextStyle: {
        color: "white",
        textAlign: "center"
    }
});