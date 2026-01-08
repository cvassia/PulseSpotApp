import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LanguageButton() {
    const { i18n } = useTranslation();



    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "el" : "en");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
            <Text style={styles.text}>{i18n.language === "en" ? "GR" : "EN"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 60,
        right: 30,
        padding: 8,
        backgroundColor: "transparent",
        zIndex: 10,
    },
    text: {
        fontSize: 25,
        color: "#af8aaa",
        fontWeight: "bold",
    },
});
