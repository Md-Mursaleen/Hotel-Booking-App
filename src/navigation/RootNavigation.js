import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import PlacesScreen from "../screens/PlacesScreen";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingsScreen from "../screens/BookingsScreen";
import PlacesMapScreen from "../screens/PlacesMapScreen";
import PropertyInfoScreen from "../screens/PropertyInfoScreen";
import RoomsScreen from "../screens/RoomsScreen";
import UsersScreen from "../screens/UsersScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import LoginScreen from "../screens/LoginScreen";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <BottomTab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ focused }) => focused ? <Entypo name="home" size={24} color="#003580" /> : <AntDesign name="home" size={24} color="black" />
            }} />
            <BottomTab.Screen name="Saved" component={SavedScreen} options={{
                tabBarIcon: ({ focused }) => focused ? <AntDesign name="heart" size={24} color="#003580" /> : <AntDesign name="hearto" size={24} color="black" />
            }} />
            <BottomTab.Screen name="Bookings" component={BookingsScreen} options={{
                tabBarIcon: ({ focused }) => focused ? <MaterialCommunityIcons name="bag-suitcase" size={29} color="#003580" /> : <MaterialCommunityIcons name="bag-suitcase-outline" size={29} color="black" />
            }} />
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => focused ? <Ionicons name="person" size={24} color="#003580" /> : <Ionicons name="person-outline" size={24} color="black" />
            }} />
        </BottomTab.Navigator>
    );
}

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Places" component={PlacesScreen} />
                <Stack.Screen name="PlacesMap" component={PlacesMapScreen} />
                <Stack.Screen name="PropertyInfo" component={PropertyInfoScreen} />
                <Stack.Screen name="Rooms" component={RoomsScreen} />
                <Stack.Screen name="Users" component={UsersScreen} />
                <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;