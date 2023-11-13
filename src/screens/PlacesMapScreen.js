import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const PlacesMapScreen = () => {
    const route = useRoute();
    const mapRef = useRef(null);
    const coordinates = [];
    const details = route.params.searchResult.map((item) => item.properties?.map((property) => {
        coordinates.push({
            latitude: property.latitude,
            longitude: property.longitude
        });
    }));
    useEffect(() => {
        mapRef.current.fitToSuppliedMarkers(coordinates, {
            animated: true,
            edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            }
        });
    }, []);
    return (
        <View>
            <MapView
                ref={mapRef}
                userInterfaceStyle="dark"
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                customMapStyle={[
                    {
                        "featureType": "landscape",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ]}
                style={styles.mapViewStyle}>
                {route.params.searchResult.map((item) => item.properties.map((property, index) => (
                    <Marker key={index} title={property.name}
                        coordinate={{
                            latitude: Number(property.latitude),
                            longitude: Number(property.longitude)
                        }}>
                        <Pressable style={styles.markerContentContainer}>
                            <Text style={styles.markerContentTextStyle}>{property.newPrice}</Text>
                        </Pressable>
                    </Marker>
                )))}
            </MapView>
        </View>
    );
}

export default PlacesMapScreen;

const styles = StyleSheet.create({
    mapViewStyle: {
        width: "100%",
        height: "100%"
    },
    markerContentContainer: {
        paddingHorizontal: 7,
        paddingVertical: 4,
        backgroundColor: "#003580",
        borderRadius: 4
    },
    markerContentTextStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    }
});