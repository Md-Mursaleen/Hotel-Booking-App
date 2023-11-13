import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileDetails from "../components/ProfileDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
    const [signedUser, setSignedUser] = useState();
    const getSignedUserData = async () => {
        const signedUserData = await AsyncStorage.getItem("SignedUserData");
        setSignedUser(JSON.parse(signedUserData));
    };
    useEffect(() => {
        getSignedUserData();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={[styles.headerIconContainer, !signedUser && { backgroundColor: "#eee" }]}>
                    <View style={[styles.headerIconStyle, !signedUser && { backgroundColor: "#f6f6f6" }]}>
                        {signedUser ? (
                            <Image source={{ uri: signedUser?.user?.photoURL }} style={styles.imageStyle} />
                        ) : (
                            <Entypo name="user" size={30} color="#cdcdcd" />
                        )}
                    </View>
                </View>
                <Text style={styles.headerTextStyle}>{signedUser?.user?.displayName}</Text>
                <Text style={styles.geniusTextStyle}>Genius Level 1</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 15 }}>
                    <ProfileDetails />
                </View>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "#003580"
    },
    headerTextStyle: {
        fontSize: 28,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    },
    geniusTextStyle: {
        marginTop: 5,
        fontSize: 17,
        fontWeight: "500",
        color: "#ffc72c",
        textAlign: "center"
    },
    headerIconContainer: {
        marginLeft: 13,
        width: 65,
        height: 65,
        alignSelf: "center",
        borderRadius: 50
    },
    headerIconStyle: {
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#ffc72c",
        borderRadius: 50
    },
    imageStyle: {
        width: 52,
        height: 52,
        borderRadius: 50
    },
    iconRowStyle: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconContainer: {
        width: 110,
        height: 95,
        backgroundColor: "#f6f6f6",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    iconTextStyle: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: "500"
    }
});