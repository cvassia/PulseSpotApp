import Colors from "@/assets/colors";
// import { useCityStore } from "@/src/store/useCityStore";
import { useCityStore } from "@/src/store/useCityStore";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Athens from "../../src/components/cities/Athens";
import Patras from "../../src/components/cities/Patras";
import Thessaloniki from "../../src/components/cities/Thessaloniki";
import { CityComponentProps } from "../../src/components/cities/types";



// import Larissa from "../../src/components/cities/Larissa";
// import Heraklion from "../../src/components/cities/Heraklion";


const CITIES = ["Athens", "Thessaloniki", "Patras",
    // "Heraklion", "Larissa"
];

export default function ChooseCity() {
    const { t } = useTranslation();
    // const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const selectedCity = useCityStore((s) => s.selectedCity);
    const setCity = useCityStore((s) => s.setCity);

    // const setCity = useCityStore((s) => s.setCity);

    useFocusEffect(
        useCallback(() => {
            setCity(null)
        },

            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        )
    );


    const cityComponents: Record<string, React.FC<CityComponentProps>> = {
        Athens,
        Thessaloniki,
        Patras,
    };


    const handleContinue = async (city: string) => {
        setCity(city);
    };

    const CityComponent = selectedCity ? cityComponents[selectedCity] : null;

    return !CityComponent ?
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.title}>{t("chooseCity") || "Choose Your City"}</Text>
            <View style={styles.cityList}>
                {CITIES.map((city) => (
                    <TouchableOpacity
                        key={city}
                        style={[
                            styles.cityButton,
                            selectedCity === city ? styles.cityButtonSelected : null,
                        ]}
                        onPress={() => handleContinue(city)}
                    >
                        <Text
                            style={[
                                styles.cityText,
                                selectedCity === city ? styles.cityTextSelected : null,
                            ]}
                        >
                            {city}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
        :
        <CityComponent
            setSelectedCity={setCity}
            selectedCity={selectedCity}
        />
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: Colors.primaryLightest,

    },
    cityList: {
        width: "100%",
        marginBottom: 32,
    },
    cityButton: {
        paddingVertical: 16,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: Colors.primaryLightest,
        alignItems: "center",
    },
    cityButtonSelected: {
        backgroundColor: Colors.primaryLight,
    },
    cityText: {
        fontSize: 18,
        color: "#333",
    },
    cityTextSelected: {
        color: "#fff",
        fontWeight: "bold",
    },
    continueButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    continueText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
