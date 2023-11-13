import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    GoogleSignin.configure({
        webClientId: "695479307466-7h9jv375bcekctgfgf7lai9m6tprpn65.apps.googleusercontent.com"
    });
    function onAuthStateChanged(user) {
        setUser(user);
        AsyncStorage.setItem("SignedUserData", JSON.stringify({ user, loggedIn: true }));
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    useEffect(() => {
        if (user) {
            navigation.navigate("BottomTab");
        }
    }, [user]);
    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const signedInUser = auth().signInWithCredential(googleCredential);
        signedInUser.then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
        if (user) {
            navigation.navigate("BottomTab");
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require("../../assets/images/home-image.png")} style={styles.logoImageStyle} />
            </View>
            <Text style={styles.titleTextStyle}>Easily book your</Text>
            <Text style={styles.subTitleTextStyle}>hotels & flights</Text>
            <Text style={styles.textStyle}>Trusted by over 1 million users</Text>
            <Image source={require("../../assets/images/login-image.png")} style={styles.imageStyle} />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => signInWithGoogle()}>
                <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {
        marginLeft: 30,
        flexDirection: "row",
        alignItems: "center"
    },
    logoImageStyle: {
        height: 220,
        width: 160,
        resizeMode: "contain"
    },
    titleTextStyle: {
        marginTop: -80,
        marginLeft: 30,
        fontSize: 38,
        fontWeight: "bold",
        color: "black"
    },
    subTitleTextStyle: {
        marginTop: -8,
        marginLeft: 30,
        fontSize: 32,
        fontWeight: "bold",
        color: "#003580"
    },
    textStyle: {
        marginTop: 15,
        marginLeft: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: "grey"
    },
    imageStyle: {
        marginTop: 40,
        height: 320,
        width: 300,
        alignSelf: "center"
    },
    buttonContainer: {
        padding: 12,
        marginTop: 85,
        marginHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0047ab",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "500",
        color: "white"
    }
});