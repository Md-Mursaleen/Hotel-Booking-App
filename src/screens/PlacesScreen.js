import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { data } from "../data/HotelsData";
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropertyCard from "../components/PropertyCard";

const PlacesScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [sortedData, setSortedData] = useState(data);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Popular Places",
            headerStyle: {
                height: 110,
                backgroundColor: "#003580",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                marginLeft: 70,
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
    const filters = [
        {
            id: "0",
            filter: "Cost: Low to High"
        },
        {
            id: "1",
            filter: "Cost: High to Low"
        }
    ];
    const searchPlace = data?.filter((item) => item.place === route.params.place);
    const HtLcompare = (x, y) => {
        if (x.newPrice > y.newPrice) {
            return -1;
        }
        if (x.newPrice < y.newPrice) {
            return 1;
        }
        return 0;
    };
    const LtHcompare = (x, y) => {
        if (x.newPrice < y.newPrice) {
            return -1;
        }
        if (x.newPrice > y.newPrice) {
            return 1;
        }
        return 0;
    };
    const applyFilter = (filter) => {
        setModalVisible(!modalVisible);
        switch (filter) {
            case "Cost: High to Low":
                searchPlace.map((item) => item.properties.sort(HtLcompare));
                setSortedData(searchPlace);
                break;
            case "Cost: Low to High":
                searchPlace.map((item) => item.properties.sort(LtHcompare));
                setSortedData(searchPlace);
                break;
        }
    };
    return (
        <View>
            <Pressable style={styles.headerContainer}>
                <Pressable style={styles.headerSubContainer} onPress={() => setModalVisible(!modalVisible)}>
                    <Octicons name="arrow-switch" size={22} color="grey" />
                    <Text style={styles.headerTextStyle}>Sort</Text>
                </Pressable>
                <Pressable style={styles.headerSubContainer}>
                    <Ionicons name="filter" size={22} color="grey" />
                    <Text style={styles.headerTextStyle}>Filter</Text>
                </Pressable>
                <Pressable style={styles.headerSubContainer} onPress={() => navigation.navigate("PlacesMap", { searchResult: searchPlace })}>
                    <FontAwesome5 name="map-marker-alt" size={22} color="grey" />
                    <Text style={styles.headerTextStyle}>Map</Text>
                </Pressable>
            </Pressable>
            <ScrollView style={styles.placesContainer} showsVerticalScrollIndicator={false}>
                {sortedData?.filter((item) => item.place === route.params.place).map((item) => item.properties.map((property, index) => (
                    <PropertyCard key={index}
                        rooms={route.params.rooms}
                        adults={route.params.adults}
                        children={route.params.children}
                        selectedDates={route.params.selectedDates}
                        property={property}
                        availableRooms={property.rooms} />
                )))}
            </ScrollView>
            <BottomModal swipeThreshold={200}
                swipeDirection={["up", "down"]}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                footer={<ModalFooter>
                    <ModalButton text="Apply" style={styles.modalButtonStyle} textStyle={{ color: "white" }} onPress={() => applyFilter(selectedFilter)} />
                </ModalFooter>}
                modalTitle={<ModalTitle title="Sort and Filter" textStyle={styles.modalTitleTextStyle} />}
                modalAnimation={new SlideAnimation({
                    slideFrom: "bottom"
                })}
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}>
                <ModalContent style={styles.modalContentContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.modalContentTopContainer}>
                            <Text style={styles.textStyle}>Sort</Text>
                        </View>
                        <View style={styles.modalContentBottomContainer}>
                            {filters.map((item, index) => (
                                <Pressable key={index} style={styles.modalContentBottomSubContainer} onPress={() => setSelectedFilter(item.filter)}>
                                    {selectedFilter.includes(item.filter) ? (
                                        <FontAwesome name="circle" size={18} color="green" />
                                    ) : (
                                        <Entypo name="circle" size={18} color="black" />
                                    )}
                                    <Text style={styles.modalContentBottomTextStyle}>{item.filter}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </ModalContent>
            </BottomModal>
        </View>
    );
}

export default PlacesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    headerContainer: {
        padding: 12,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    headerSubContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerTextStyle: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "500"
    },
    placesContainer: {
        height: "95%",
        backgroundColor: "#f5f5f5"
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
    modalContentContainer: {
        width: "100%",
        height: 280
    },
    modalContentTopContainer: {
        flex: 2,
        marginVertical: 10,
        height: 280,
        borderRightWidth: 1,
        borderRightColor: "#e0e0e0"
    },
    textStyle: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    },
    modalContentBottomContainer: {
        flex: 3,
        margin: 10
    },
    modalContentBottomSubContainer: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    modalContentBottomTextStyle: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: "500"
    }
});