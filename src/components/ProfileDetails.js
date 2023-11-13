import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileDetails = () => {
    const navigation = useNavigation();
    const signOutWithGoogle = async () => {
        auth().signOut();
        navigation.navigate("Login");
    };
    return (
        <View>
            <View style={[styles.itemContainer, { marginTop: 15 }]}>
                <Ionicons name="person-outline" size={21} color="black" />
                <Text style={styles.itemTextStyle}>Manage your account</Text>
            </View>
            <View style={styles.itemContainer}>
                <Ionicons name="wallet-outline" size={21} color="black" />
                <Text style={styles.itemTextStyle}>Rewards & Wallet</Text>
            </View>
            <View style={styles.itemContainer}>
                <SimpleLineIcons name="social-google" size={21} color="black" />
                <Text style={styles.itemTextStyle}>Genius loyalty programme</Text>
            </View>
            <View style={styles.itemContainer}>
                <Feather name="thumbs-up" size={21} color="black" />
                <Text style={styles.itemTextStyle}>Reviews</Text>
            </View>
            <View style={styles.itemContainer}>
                <MaterialCommunityIcons name="file-question-outline" size={23} color="black" style={{ marginLeft: -1 }} />
                <Text style={styles.itemTextStyle}>Questions to properties</Text>
            </View>
            <View style={styles.itemContainer}>
                <Ionicons name="airplane-outline" size={22} color="black" />
                <Text style={styles.itemTextStyle}>Airport taxis</Text>
            </View>
            <View style={styles.itemContainer}>
                <AntDesign name="questioncircleo" size={21} color="black" />
                <Text style={styles.itemTextStyle}>Contact Customer Service</Text>
            </View>
            <View style={styles.itemContainer}>
                <Ionicons name="help-buoy-outline" size={23} color="black" />
                <Text style={styles.itemTextStyle}>Safety resource center</Text>
            </View>
            <View style={styles.itemContainer}>
                <MaterialCommunityIcons name="home-search-outline" size={26} color="black" style={{ marginLeft: -1 }} />
                <Text style={styles.itemTextStyle}>Search your property</Text>
            </View>
            <View style={styles.itemContainer}>
                <MaterialCommunityIcons name="label-percent-outline" size={26} color="black" style={{ marginLeft: -1 }} />
                <Text style={styles.itemTextStyle}>Deals</Text>
            </View>
            <View style={styles.itemContainer}>
                <Ionicons name="settings-outline" size={22} color="black" />
                <Text style={styles.itemTextStyle}>Settings</Text>
            </View>
            <Pressable style={[styles.itemContainer, { marginBottom: 25 }]} onPress={() => signOutWithGoogle()}>
                <Octicons name="sign-out" size={21} color="red" />
                <Text style={[styles.itemTextStyle, { color: "red" }]}>Sign out</Text>
            </Pressable>
        </View>
    );
}

export default ProfileDetails;

const styles = StyleSheet.create({
    itemContainer: {
        marginLeft: 20,
        marginTop: 35,
        flexDirection: "row",
        alignItems: "center"
    },
    itemTextStyle: {
        marginLeft: 20,
        fontSize: 15,
        fontWeight: "500",
        color: "black"
    }
});