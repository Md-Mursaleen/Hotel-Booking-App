import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BookingsScreen = () => {
    const bookings = useSelector((state) => state.booking.booking);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Bookings",
            headerStyle: {
                height: 110,
                backgroundColor: "#003580",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 95,
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
    console.log(bookings);
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
    return (
        <SafeAreaView>
            {bookings.length > 0 && bookings.map((item, index) => (
                <Pressable style={styles.itemContainer} key={index}>
                    <View>
                        <Text style={styles.propertyNameTextStyle}>{truncate(item.name, 20)}</Text>
                        <View style={styles.itemSubTopContainer}>
                            <MaterialIcons name="stars" size={24} color="green" />
                            <Text style={styles.propertyRatingTextStyle}>{item.rating} • </Text>
                            <View style={styles.propertyLevelContainerStyle}>
                                <Text style={styles.propertyLevelTextStyle}>Genius Level</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            ))}
        </SafeAreaView>
    );
}

export default BookingsScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 5
    },
    propertyNameTextStyle: {
        fontSize: 23,
        fontWeight: "bold"
    },
    itemSubTopContainer: {
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
    }
});