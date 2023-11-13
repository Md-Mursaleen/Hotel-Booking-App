import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { pixelNormalSize } from "../components/Normalise";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Amenities from "../components/Amenities";

const PropertyInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: `${route.params.name}`,
            headerStyle: {
                height: 110,
                backgroundColor: "#003580",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
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
    const difference = route.params.oldPrice - route.params.newPrice;
    const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100;
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
    return (
        <>
            <ScrollView>
                <Pressable style={styles.headerContainer}>
                    {route.params.photos.slice(0, 5).map((photo, index) => (
                        <View key={index} style={{ margin: 6 }}>
                            <Image source={{ uri: photo.image }} style={styles.imageStyle} />
                        </View>
                    ))}
                    <Pressable style={styles.headerSubContainer}>
                        <Text style={styles.headerTextStyle}>Show More</Text>
                    </Pressable>
                </Pressable>
                <View style={styles.middleContainer}>
                    <View>
                        <Text style={styles.propertyNameTextStyle}>{truncate(route.params.name, 20)}</Text>
                        <View style={styles.middleTopSubContainer}>
                            <MaterialIcons name="stars" size={24} color="green" />
                            <Text style={styles.propertyRatingTextStyle}>{route.params.rating} • </Text>
                            <View style={styles.propertyLevelContainerStyle}>
                                <Text style={styles.propertyLevelTextStyle}>Genius Level</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.middleBottomContainer}>
                        <Text style={styles.middleBottomTextStyle}>Travel sustainable</Text>
                    </View>
                </View>
                <View style={[styles.borderStyle, { marginTop: 15 }]} />
                <Text style={styles.textStyle}>Price for 1 Night , {route.params.adults} Adults</Text>
                <View style={styles.propertyPriceContainerStyle}>
                    <Text style={styles.propertyOldPriceTextStyle}>Rs{route.params.oldPrice * route.params.adults}</Text>
                    <Text style={styles.propertyNewPriceTextStyle}>Rs {route.params.newPrice * route.params.adults}</Text>
                </View>
                <View style={styles.offerPriceContainer}>
                    <Text style={styles.offerPriceTextStyle}>{offerPrice.toFixed(0)}% OFF</Text>
                </View>
                <View style={[styles.borderStyle, { marginTop: 15 }]} />
                <View style={styles.checkDatesContainer}>
                    <View>
                        <Text style={styles.checkDateTextStyle}>Check In</Text>
                        <Text style={styles.informationTextStyle}>{route.params.selectedDates.startDate}</Text>
                    </View>
                    <View>
                        <Text style={styles.checkDateTextStyle}>Check Out</Text>
                        <Text style={styles.informationTextStyle}>{route.params.selectedDates.endDate}</Text>
                    </View>
                </View>
                <View style={{ margin: 12 }}>
                    <Text style={styles.roomsTitleTextStyle}>Rooms and Guests</Text>
                    <Text style={styles.informationTextStyle}>{route.params.rooms} rooms {route.params.adults} adults {route.params.children} children</Text>
                </View>
                <View style={[styles.borderStyle, { marginTop: 7 }]} />
                <Amenities margin={10} />
                <View style={[styles.borderStyle, { marginTop: 8 }]} />
            </ScrollView>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Rooms", {
                name: route.params.name,
                rating: route.params.rating,
                newPrice: route.params.newPrice,
                oldPrice: route.params.oldPrice,
                rooms: route.params.availableRooms,
                adults: route.params.adults,
                children: route.params.children,
                startDate: route.params.selectedDates.startDate,
                endDate: route.params.selectedDates.endDate
            })}>
                <Text style={styles.buttonTextStyle}>Select Availability</Text>
            </TouchableOpacity>
        </>
    );
}

export default PropertyInfoScreen;

const styles = StyleSheet.create({
    headerContainer: {
        margin: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    imageStyle: {
        width: 112,
        height: pixelNormalSize(80),
        borderRadius: pixelNormalSize(4)
    },
    headerSubContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    headerTextStyle: {
        marginLeft: 20,
        textAlign: "center"
    },
    middleContainer: {
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
    middleTopSubContainer: {
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
    middleBottomContainer: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: "#17b169",
        borderRadius: 6
    },
    middleBottomTextStyle: {
        fontSize: 13,
        color: "white"
    },
    borderStyle: {
        borderWidth: 3,
        borderColor: "#e0e0e0"
    },
    textStyle: {
        marginTop: 10,
        marginHorizontal: 12,
        fontSize: 17,
        fontWeight: "400"
    },
    propertyPriceContainerStyle: {
        marginTop: 4,
        marginHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    propertyOldPriceTextStyle: {
        fontSize: 20,
        fontWeight: "500",
        color: "red",
        textDecorationLine: "line-through"
    },
    propertyNewPriceTextStyle: {
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 0.5
    },
    offerPriceContainer: {
        marginTop: 7,
        paddingHorizontal: 4,
        paddingVertical: 5,
        marginHorizontal: 12,
        width: 70,
        backgroundColor: "green",
        borderRadius: 4
    },
    offerPriceTextStyle: {
        color: "white",
        textAlign: "center"
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
        padding: 15,
        marginTop: 5,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6cb4ee"
    },
    buttonTextStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    }
});