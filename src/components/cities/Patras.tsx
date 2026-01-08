import Colors from "@/assets/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import LanguageButton from "../src/components/LanguageButton";

export default function HomeTab({ setSelectedCity }: { setSelectedCity: (city: string | null) => void }) {
    return (
        <View style={styles.container}>
            {/* <LanguageButton /> */}
            <Text style={styles.welcomeText}>
                {"Welcome!"}
            </Text>

            <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => setSelectedCity(null)}
            >
                <Text style={styles.ctaText}>{"Back"}</Text>
                {/* <FontAwesome name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} /> */}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    placeholder: {
        fontSize: 16,
        color: "#555",
        marginTop: 16,
    },
    ctaButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primaryLight,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 8,
    },
    ctaText: {
        color: Colors.lightGray,
        fontSize: 18,
        fontWeight: "bold",
    },
});
