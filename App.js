import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import store from "./store";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigation from "./src/navigation/RootNavigation";

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("white");
  }, []);
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <RootNavigation />
        <StatusBar style="auto" />
        <ModalPortal />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
