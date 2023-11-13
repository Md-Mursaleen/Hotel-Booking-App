import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UsersScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "User Details",
            headerStyle: {
                height: 110,
                backgroundColor: "#003580",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 85,
                marginTop: 17,
                fontSize: 20,
                fontWeight: "bold",
                color: "white"
            },
            headerLeft: () => (
                <Ionicons name="chevron-back" size={28} color="white" style={{ marginLeft: 12, marginTop: 17 }} onPress={() => navigation.goBack()} />
            )
        });
    }, []);
    const onPressedFinalStep = () => {
        if (!firstName || !lastName || !email || !phoneNo) {
            Alert.alert(
                "Invalide Details",
                "Please ente all the fields",
                [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
        if (firstName && lastName && email && phoneNo) {
            navigation.navigate("Confirmation", {
                name: route.params.name,
                rating: route.params.rating,
                children: route.params.children,
                adults: route.params.adults,
                oldPrice: route.params.oldPrice,
                newPrice: route.params.newPrice,
                startDate: route.params.startDate,
                endDate: route.params.endDate
            });
        }
    };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.textInputContainerStyle}>
                    <Text>First Name</Text>
                    <TextInput value={firstName} onChangeText={(value) => setFirstName(value)} style={styles.textInputStyle} />
                </View>
                <View style={[styles.textInputContainerStyle, { marginTop: 10 }]}>
                    <Text>Last Name</Text>
                    <TextInput value={lastName} onChangeText={(value) => setLastName(value)} style={styles.textInputStyle} />
                </View>
                <View style={[styles.textInputContainerStyle, { marginTop: 10 }]}>
                    <Text>Email</Text>
                    <TextInput value={email} onChangeText={(value) => setEmail(value)} style={styles.textInputStyle} />
                </View>
                <View style={[styles.textInputContainerStyle, { marginTop: 10 }]}>
                    <Text>Phone No</Text>
                    <TextInput value={phoneNo} onChangeText={(value) => setPhoneNo(value)} style={styles.textInputStyle} />
                </View>
            </View>
            <Pressable style={styles.bottomContainer}>
                <View>
                    <View style={styles.propertyPriceContainerStyle}>
                        <Text style={styles.propertyOldPriceTextStyle}>Rs{route.params.oldPrice * route.params.adults}</Text>
                        <Text style={styles.propertyNewPriceTextStyle}>Rs {route.params.newPrice * route.params.adults}</Text>
                    </View>
                    <Text style={styles.textStyle}>You saved {route.params.oldPrice - route.params.newPrice} rupees</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={onPressedFinalStep}>
                    <Text style={styles.buttonTextStyle}>Final Step</Text>
                </TouchableOpacity>
            </Pressable>
        </>
    );
}

export default UsersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginVertical: 5,
        backgroundColor: "white"
    },
    textInputContainerStyle: {
        flexDirection: "column",
        gap: 10
    },
    textInputStyle: {
        padding: 8,
        borderWidth: 1,
        borderColor: "grey"
    },
    bottomContainer: {
        padding: 9,
        marginTop: "auto",
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    propertyPriceContainerStyle: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
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
    textStyle: {
        marginTop: 3,
        fontSize: 14,
        color: "grey"
    },
    buttonContainer: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007fff",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white"
    }
});