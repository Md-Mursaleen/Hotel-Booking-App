import React from "react";
import { Dimensions, Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const PropertyCard = ({ rooms, adults, children, selectedDates, property, availableRooms }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Pressable onPress={() => navigation.navigate("PropertyInfo", {
                    name: property.name,
                    rating: property.rating,
                    newPrice: property.newPrice,
                    oldPrice: property.oldPrice,
                    photos: property.photos,
                    availableRooms: property.rooms,
                    rooms: rooms,
                    adults: adults,
                    children: children,
                    selectedDates: selectedDates
                })}>
                    <Image source={{ uri: property.image }} style={styles.imageStyle} />
                </Pressable>
                <View style={{ padding: 10 }}>
                    <View style={styles.informationHeaderContainer}>
                        <Text style={styles.propertyNameTextStyle}>{property.name}</Text>
                        <AntDesign name="hearto" size={24} color="red" />
                    </View>
                    <View style={styles.informationMiddleContainer}>
                        <MaterialIcons name="stars" size={24} color="green" />
                        <Text style={styles.propertyRatingTextStyle}>{property.rating} • </Text>
                        <View style={styles.propertyLevelContainerStyle}>
                            <Text style={styles.propertyLevelTextStyle}>Genius Level</Text>
                        </View>
                    </View>
                    <Text style={styles.propertyAddressTextStyle}>{property.address.length > 50 ? property.address.substr(0, 50) : property.address}</Text>
                    <Text style={styles.textStyle}>Price for 1 Night , {adults} Adults</Text>
                    <View style={styles.propertyPriceContainerStyle}>
                        <Text style={styles.propertyOldPriceTextStyle}>Rs{property.oldPrice * adults}</Text>
                        <Text style={styles.propertyNewPriceTextStyle}>Rs {property.newPrice * adults}</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={styles.propertyRoomTextStyle}>Deluxe Room</Text>
                        <Text style={styles.propertyRoomTextStyle}>Hotel Room : 1 bed</Text>
                    </View>
                    <View style={styles.propertyDealContainerStyle}>
                        <Text style={styles.propertyDealTextStyle}>Limited time Deal</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PropertyCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    itemContainer: {
        margin: 15,
        flexDirection: "row",
        backgroundColor: "white"
    },
    imageStyle: {
        width: width - 270,
        height: height / 3
    },
    informationHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    propertyNameTextStyle: {
        width: 200,
        fontSize: 16,
        fontWeight: "500"
    },
    informationMiddleContainer: {
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
        backgroundColor: "#6cb4ee",
        borderRadius: 5
    },
    propertyLevelTextStyle: {
        fontSize: 15,
        color: "white",
        textAlign: "center"
    },
    propertyAddressTextStyle: {
        marginTop: 6,
        width: 210,
        fontSize: 15,
        fontWeight: "500",
        color: "#8a8a8a"
    },
    textStyle: {
        marginTop: 4,
        fontSize: 17,
        fontWeight: "400"
    },
    propertyPriceContainerStyle: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
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
    propertyRoomTextStyle: {
        fontSize: 16,
        color: "grey"
    },
    propertyDealContainerStyle: {
        paddingVertical: 2,
        paddingHorizontal: 3,
        marginTop: 2,
        width: 150,
        backgroundColor: "#6082b6",
        borderRadius: 5
    },
    propertyDealTextStyle: {
        fontSize: 14.5,
        color: "white",
        textAlign: "center"
    }
});