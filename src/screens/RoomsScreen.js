import React, { useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Amenities from "../components/Amenities";

const RoomsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selected, setSelected] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Available Rooms",
            headerStyle: {
                height: 110,
                backgroundColor: "white",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 70,
                marginTop: 17,
                fontSize: 20,
                fontWeight: "600",
                color: "black"
            },
            headerLeft: () => (
                <Ionicons name="chevron-back" size={28} color="#007fff" style={{ marginLeft: 12, marginTop: 17 }} onPress={() => navigation.goBack()} />
            )
        });
    }, []);
    return (
        <>
            <ScrollView>
                {route.params.rooms.map((room, index) => (
                    <Pressable key={index} style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <Text style={styles.nameTextStyle}>{room.name}</Text>
                            <AntDesign name="infocirlceo" size={24} color="#007fff" />
                        </View>
                        <Text style={styles.textStyle}>Pay at the property</Text>
                        <Text style={styles.cancellationTextStyle}>Free cancellation available</Text>
                        <View style={styles.propertyPriceContainerStyle}>
                            <Text style={styles.propertyOldPriceTextStyle}>Rs{route.params.oldPrice * route.params.adults}</Text>
                            <Text style={styles.propertyNewPriceTextStyle}>Rs {route.params.newPrice * route.params.adults}</Text>
                        </View>
                        <View style={{ width: 370 }}>
                            <Amenities margin={9} />
                        </View>
                        {selected.includes(room.name) ? (
                            <TouchableOpacity style={styles.selectedButtonContainer} onPress={() => setSelected(room.name)}>
                                <Text style={styles.selectedButtonTextStyle}>SELECTED</Text>
                                <Entypo name="circle-with-cross" size={24} color="red" onPress={() => setSelected([])} />
                            </TouchableOpacity>
                        ) : (<TouchableOpacity style={styles.unselectedButtonContainer} onPress={() => setSelected(room.name)}>
                            <Text style={styles.unselectedButtonTextStyle}>SELECT</Text>
                        </TouchableOpacity>

                        )}
                    </Pressable>
                ))}
            </ScrollView>
            {selected.length > 0 && (
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Users", {
                    name: route.params.name,
                    rating: route.params.rating,
                    children: route.params.children,
                    adults: route.params.adults,
                    oldPrice: route.params.oldPrice,
                    newPrice: route.params.newPrice,
                    startDate: route.params.startDate,
                    endDate: route.params.endDate
                })}>
                    <Text style={styles.buttonTextStyle}>Reserve</Text>
                </TouchableOpacity>
            )}
        </>
    );
}

export default RoomsScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: "white"
    },
    itemSubContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    nameTextStyle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#007fff"
    },
    propertyPriceContainerStyle: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    textStyle: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "500"
    },
    cancellationTextStyle: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "500",
        color: "green"
    },
    propertyOldPriceTextStyle: {
        fontSize: 18,
        fontWeight: "500",
        color: "red",
        textDecorationLine: "line-through"
    },
    propertyNewPriceTextStyle: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: "500",
        letterSpacing: 0.5
    },
    selectedButtonContainer: {
        padding: 11,
        marginTop: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f8ff",
        borderWidth: 2,
        borderColor: "#318ce7",
        borderRadius: 5
    },
    selectedButtonTextStyle: {
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 17,
        fontWeight: "600",
        color: "#318ce7"
    },
    unselectedButtonContainer: {
        padding: 11,
        marginTop: 5,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#007fff",
        borderRadius: 5
    },
    unselectedButtonTextStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#007fff"
    },
    buttonContainer: {
        padding: 12,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007fff",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    }
});