import React, { useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";
import HomeHeader from "../components/HomeHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import DatePicker from "react-native-date-ranges";

const HomeScreen = () => {
    const [rooms, setRooms] = useState(1);
    const [children, setChildren] = useState(0);
    const [adults, setAdults] = useState(2);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDates, setSelectedDates] = useState();
    const navigation = useNavigation();
    const route = useRoute();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Booking.com",
            headerStyle: {
                height: 100,
                backgroundColor: "#003580",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 120,
                marginTop: 17,
                fontSize: 20,
                fontWeight: "bold",
                color: "white"
            },
            headerRight: () => (
                <Ionicons name="notifications-outline" size={24} color="white" style={{ marginRight: 12, marginTop: 17 }} />
            )
        });
    }, []);
    const customButton = (onConfirm) => {
        return (
            <TouchableOpacity style={styles.datePickerButtonContainer} onPress={onConfirm}>
                <Text style={styles.datePickerButtonTextStyle}>Submit</Text>
            </TouchableOpacity>
        );
    };
    const searchPlaces = (place) => {
        if (!route?.params || !selectedDates) {
            Alert.alert(
                "Invalid Details",
                "Please enter all the details",
                [
                    {
                        text: "cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed")
                    }
                ],
                { cancelable: false }
            );
        }
        if (route?.params && selectedDates) {
            navigation.navigate("Places", {
                rooms: rooms,
                adults: adults,
                children: children,
                selectedDates: selectedDates,
                place: place
            });
        }
    };
    return (
        <>
            <View>
                <HomeHeader />
                <ScrollView>
                    <View style={styles.middleContainer}>
                        <Pressable style={styles.middleItemContainer} onPress={() => navigation.navigate("Search")}>
                            <Feather name="search" size={24} color="black" />
                            <TextInput placeholder={route?.params ? route.params.userInput : "Enter your Destination"}
                                placeholderTextColor="black"
                                editable={false}
                                selectTextOnFocus={false}
                            />
                        </Pressable>
                        <Pressable style={styles.middleItemContainer}>
                            <Feather name="calendar" size={24} color="black" />
                            <DatePicker
                                style={styles.datePickerContainerStyle}
                                customStyles={{
                                    placeholderText: styles.textStyle,
                                    headerMarkTitle: styles.markTextStyle,
                                    headerStyle: { backgroundColor: "#003580" },
                                    contentText: styles.textStyle
                                }}
                                selectedBgColor="#0047ab"
                                customButton={(onConfirm) => customButton(onConfirm)}
                                onConfirm={(startDate, endDate) => setSelectedDates(startDate, endDate)}
                                centerAlign
                                allowFontScaling={false}
                                placeholder={"Select Your Dates"}
                                markText={"Pick Your Date"}
                                mode={"range"}
                            />
                        </Pressable>
                        <Pressable style={styles.middleItemContainer} onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="person-outline" size={24} color="black" />
                            <TextInput placeholder={`${rooms} room • ${adults} adults • ${children} Children`}
                                placeholderTextColor="red"
                                editable={false}
                                selectTextOnFocus={false}
                            />
                        </Pressable>
                        <Pressable style={styles.buttonContainer} onPress={() => searchPlaces(route?.params?.userInput)}>
                            <Text style={styles.buttonTextStyle}>Search</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.bottomTitleStyle}>Travel more and spend less</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Pressable style={[styles.bottomContainer, { backgroundColor: "#003580" }]}>
                            <Text style={[styles.bottomTextStyle, { fontWeight: "bold", color: "white" }]}>Genius</Text>
                            <Text style={[styles.bottomTextStyle, { fontWeight: "500", color: "white" }]}>You are ate genius level one in our loyality program.</Text>
                        </Pressable>
                        <Pressable style={[styles.bottomContainer, { borderWidth: 2, borderColor: "#e0e0e0" }]}>
                            <Text style={[styles.bottomTextStyle, { fontWeight: "bold" }]}>15% Discounts</Text>
                            <Text style={[styles.bottomTextStyle, { fontWeight: "500" }]}>Complete 5 stays to unlock level 2.</Text>
                        </Pressable>
                        <Pressable style={[styles.bottomContainer, { borderWidth: 2, borderColor: "#e0e0e0" }]}>
                            <Text style={[styles.bottomTextStyle, { fontWeight: "bold" }]}>10% Discounts</Text>
                            <Text style={[styles.bottomTextStyle, { fontWeight: "500" }]}>Enjoy Discounts in participating at properties at worldwide.</Text>
                        </Pressable>
                    </ScrollView>
                    <View style={styles.imageContainerStyle}>
                        <Image source={require("../../assets/images/home-image.png")} style={styles.imageStyle} />
                    </View>
                </ScrollView>
            </View>
            <BottomModal swipeThreshold={200}
                swipeDirection={["up", "down"]}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                footer={<ModalFooter>
                    <ModalButton text="Apply" style={styles.modalButtonStyle} textStyle={{ color: "white" }} onPress={() => setModalVisible(!modalVisible)} />
                </ModalFooter>}
                modalTitle={<ModalTitle title="Select rooms and guests" textStyle={styles.modalTitleTextStyle} />}
                modalAnimation={new SlideAnimation({
                    slideFrom: "bottom"
                })}
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}>
                <ModalContent style={styles.modalContentContainerStyle}>
                    <View style={styles.modalBottomContainer}>
                        <Text style={styles.modalBottomTitleTextStyle}>Rooms</Text>
                        <View style={styles.modalBottomSubContainer}>
                            <Pressable style={styles.modalBottomButtonContainer} onPress={() => setRooms(Math.max(1, rooms - 1))}>
                                <Text style={styles.modalBottomButtonTextStyle}>-</Text>
                            </Pressable>
                            <View>
                                <Text style={styles.modalBottomTextStyle}>{rooms}</Text>
                            </View>
                            <Pressable style={styles.modalBottomButtonContainer} onPress={() => setRooms((value) => value + 1)}>
                                <Text style={styles.modalBottomButtonTextStyle}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.modalBottomContainer}>
                        <Text style={styles.modalBottomTitleTextStyle}>Adults</Text>
                        <View style={styles.modalBottomSubContainer}>
                            <Pressable style={styles.modalBottomButtonContainer} onPress={() => setAdults(Math.max(1, adults - 1))}>
                                <Text style={styles.modalBottomButtonTextStyle}>-</Text>
                            </Pressable>
                            <View>
                                <Text style={styles.modalBottomTextStyle}>{adults}</Text>
                            </View>
                            <Pressable style={styles.modalBottomButtonContainer} onPress={() => setAdults((value) => value + 1)}>
                                <Text style={styles.modalBottomButtonTextStyle}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.modalBottomContainer}>
                        <Text style={styles.modalBottomTitleTextStyle}>Children</Text>
                        <View style={styles.modalBottomSubContainer}>
                            <Pressable style={styles.modalBottomButtonContainer} onPress={() => setChildren(Math.max(0, children - 1))}>
                                <Text style={styles.modalBottomButtonTextStyle}>-</Text>
                            </Pressable>
                            <View>
                                <Text style={styles.modalBottomTextStyle}>{children}</Text>
                            </View>
                            <Pressable style={styles.modalBottomButtonContainer} onPress={() => setChildren((value) => value + 1)}>
                                <Text style={styles.modalBottomButtonTextStyle}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                </ModalContent>
            </BottomModal>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    datePickerButtonContainer: {
        marginTop: -30,
        padding: 13,
        marginHorizontal: 10,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#003580",
        borderRadius: 5
    },
    datePickerButtonTextStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    },
    middleContainer: {
        margin: 20,
        borderWidth: 3,
        borderColor: "#ffc72c",
        borderRadius: 6
    },
    middleItemContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#ffc72c",
        gap: 10
    },
    datePickerContainerStyle: {
        width: 350,
        height: 30,
        borderWidth: 0,
        borderColor: "transparent",
        borderRadius: 0
    },
    textStyle: {
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 15
    },
    markTextStyle: {
        fontSize: 20.5,
        fontWeight: "bold",
        color: "#2eaae0"
    },
    buttonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "#2a52be",
        borderWidth: 2,
        borderColor: "#ffc72c"
    },
    buttonTextStyle: {
        fontSize: 15,
        fontWeight: "500",
        color: "white",
        textAlign: "center"
    },
    bottomTitleStyle: {
        marginHorizontal: 20,
        fontSize: 17,
        fontWeight: "500"
    },
    bottomContainer: {
        padding: 20,
        marginTop: 10,
        marginHorizontal: 10,
        width: 200,
        height: 150,
        borderRadius: 10
    },
    bottomTextStyle: {
        marginVertical: 7,
        fontSize: 15
    },
    imageContainerStyle: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 200,
        height: 50,
        resizeMode: "cover"
    },
    modalButtonStyle: {
        marginBottom: 20,
        marginHorizontal: 15,
        height: 57,
        backgroundColor: "#003580",
        color: "white"
    },
    modalTitleTextStyle: {
        fontSize: 20,
        fontWeight: "700"
    },
    modalContentContainerStyle: {
        marginTop: 15,
        width: "100%",
        height: 220
    },
    modalBottomContainer: {
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    modalBottomTitleTextStyle: {
        fontSize: 16.5,
        fontWeight: "500"
    },
    modalBottomSubContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    modalBottomButtonContainer: {
        width: 30,
        height: 30,
        backgroundColor: "#e0e0e0",
        borderColor: "#bebebe",
        borderRadius: 50
    },
    modalBottomButtonTextStyle: {
        paddingHorizontal: 6,
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center"
    },
    modalBottomTextStyle: {
        paddingHorizontal: 6,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    }
});