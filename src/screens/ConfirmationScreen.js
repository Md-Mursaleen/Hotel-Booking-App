import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { savedPlaces } from "../../SavedReducer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ConfirmationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Confirmation",
            headerStyle: {
                height: 110,
                backgroundColor: "white",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 85,
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
    const onPressedBookNow = () => {
        dispatch(savedPlaces(route.params));
        Alert.alert(
            "Hey",
            "Your booking has been placed",
            [{
                text: "Go Home",
                onPress: () => navigation.navigate("BottomTab")
            }]
        );
    };
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
    return (
        <View>
            <Pressable style={styles.itemContainer}>
                <View style={styles.itemSubContainer}>
                    <View>
                        <Text style={styles.propertyNameTextStyle}>{truncate(route.params.name, 20)}</Text>
                        <View style={styles.itemTopSubContainer}>
                            <MaterialIcons name="stars" size={24} color="green" />
                            <Text style={styles.propertyRatingTextStyle}>{route.params.rating} • </Text>
                            <View style={styles.propertyLevelContainerStyle}>
                                <Text style={styles.propertyLevelTextStyle}>Genius Level</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemBottomSubContainer}>
                        <Text style={styles.itemBottomSubTextStyle}>Travel sustainable</Text>
                    </View>
                </View>
                <View style={styles.checkDatesContainer}>
                    <View>
                        <Text style={styles.checkDateTextStyle}>Check In</Text>
                        <Text style={styles.informationTextStyle}>{route.params.startDate}</Text>
                    </View>
                    <View>
                        <Text style={styles.checkDateTextStyle}>Check Out</Text>
                        <Text style={styles.informationTextStyle}>{route.params.endDate}</Text>
                    </View>
                </View>
                <View style={{ margin: 12 }}>
                    <Text style={styles.roomsTitleTextStyle}>Rooms and Guests</Text>
                    <Text style={styles.informationTextStyle}>{route.params.rooms} rooms {route.params.adults} adults {route.params.children} children</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={onPressedBookNow}>
                    <Text style={styles.buttonTextStyle}>Book Now</Text>
                </TouchableOpacity>
            </Pressable>
        </View>
    );
}

export default ConfirmationScreen;

const styles = StyleSheet.create({
    itemContainer: {
        margin: 10,
        backgroundColor: "white"
    },
    itemSubContainer: {
        marginTop: 10,
        marginHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    propertyNameTextStyle: {
        fontSize: 23,
        fontWeight: "bold"
    },
    itemTopSubContainer: {
        marginTop: 7,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    propertyRatingTextStyle: {
        fontSize: 17,
        color: "grey"
    },
    propertyLevelContainerStyle: {
        paddingVertical: 3,
        width: 100,
        backgroundColor: "#003580",
        borderRadius: 5
    },
    propertyLevelTextStyle: {
        fontSize: 15,
        color: "white",
        textAlign: "center"
    },
    itemBottomSubContainer: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: "#17b169",
        borderRadius: 6
    },
    itemBottomSubTextStyle: {
        fontSize: 13,
        color: "white"
    },
    checkDatesContainer: {
        margin: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 60
    },
    checkDateTextStyle: {
        marginBottom: 3,
        fontSize: 16,
        fontWeight: "600"
    },
    informationTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007fff"
    },
    roomsTitleTextStyle: {
        marginBottom: 3,
        fontSize: 16,
        fontWeight: "600"
    },
    buttonContainer: {
        padding: 8,
        marginLeft: 10,
        marginBottom: 15,
        width: 95,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#003580",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white"
    }
});