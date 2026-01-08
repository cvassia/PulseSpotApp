import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

export interface Place {
    id: string;
    name: string;
    description: string;
    website: string;
    suburb: string;
    imageUrl: string;
    category: string;
    address_line2: string;
}

// const API_KEY = process.env.GEOAPIFY_KEY; // your Geoapify key
const API_KEY = "757557a3414f412a98c07cc9d26cb89d";

const mapCategory = (categories?: string[]) => {
    if (!categories || categories.length === 0) return "other";

    const lowerCategories = categories.map(c => c.toLowerCase());

    if (lowerCategories.some(c => c.includes("restaurant") || c.includes("cafe") || c.includes("catering"))) {
        return "restaurant";
    }
    if (lowerCategories.some(c => c.includes("bar"))) {
        return "bar";
    }
    if (lowerCategories.some(c => c.includes("spa") || c.includes("massage"))) {
        return "spa";
    }
    if (lowerCategories.some(c => c.includes("museum") || c.includes("artwork") || c.includes("gallery"))) {
        return "art";
    }
    if (lowerCategories.some(c => c.includes("archaeological") || c.includes("ruins"))) {
        return "archaeological site";
    }
    if (lowerCategories.some(c => c.includes("park") || c.includes("leisure"))) {
        return "leisure";
    }
    if (lowerCategories.some(c => c.includes("sport") || c.includes("fitness") || c.includes("stadium"))) {
        return "sport";
    }

    return "other"; // fallback
};

// assets/images/index.ts
export const categoryImages: Record<string, any> = {
    restaurant: require("@/assets/images/gourmet.jpg"),
    // bar: require("@/assets/images/bar.png"),
    // spa: require("@/assets/images/spa.png"),
    // art: require("@/assets/images/art.png"),
    // "archaeological site": require("@/assets/images/archaeological_site.png"),
    // leisure: require("@/assets/images/leisure.png"),
    // sport: require("@/assets/images/sport.png"),
    // other: require("@/assets/images/other.png"),
};




const CATEGORIES = [
    "catering.restaurant",
    "catering.bar",
    "catering.cafe",
    "entertainment",
    "leisure",
    "sport",
    "activity",
    "service.beauty.spa",
    "service.beauty.massage",
    "tourism.attraction.artwork",
    "tourism.sights.archaeological_site",
    "adult.nightclub",
    "natural"
];

export default function Athens() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        setLoading(true);
        const allPlaces: Place[] = [];

        for (const category of CATEGORIES) {
            try {
                const res = await fetch(
                    `https://api.geoapify.com/v2/places?categories=${category}&filter=rect:23.65,37.9,23.85,38.1&limit=50&apiKey=${API_KEY}`
                );
                const data = await res.json();
                if (!data.features) continue;


                const parsed = data.features.map((f: any) => {
                    const p = f.properties || {};
                    const geo = f.geometry || {};
                    return {
                        id: p.place_id || `${geo.lat || 0}_${geo.lon || 0}`,
                        name: p.name || "Unknown",
                        description: p.description || "",
                        neighbourhood: p.neighbourhood || "",
                        suburb: p.suburb || "",
                        website: p.website || "",
                        imageUrl: p.image || "",
                        category: mapCategory(p.categories),
                        address_line2: p.address_line2 || "",
                    };
                });

                // .includes("restaurant") ? "restaurant"??

                allPlaces.push(...parsed);
            } catch (err) {
                console.error("Error fetching category", category, err);
            }
        }

        setPlaces(allPlaces);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Athens Places</Text>

            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text>Loading...</Text>
                </View>
            )}

            {!loading && places.length === 0 && (
                <Text style={{ marginTop: 16 }}>No places found.</Text>
            )}

            {!loading && places.length > 0 && (
                <FlatList
                    data={places}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        console.log(categoryImages[item.category])
                        return <View style={styles.placeCard}>
                            <Image
                                source={
                                    item.imageUrl
                                        ? { uri: item.imageUrl }
                                        : categoryImages[item.category]
                                }
                                style={{ width: 100, height: 100 }}
                            />

                            <Text style={styles.placeName}>{item.name}</Text>
                            {item.description ? <Text>{item.description}</Text> : null}
                            <Text style={styles.placeCategory}>{item.category}</Text>
                            {item.suburb ? <Text>{item.suburb}</Text> : null}
                            {item.website ? <Text>{item.website}</Text> : null}
                            {item.address_line2 ? <Text>{item.address_line2}</Text> : null}

                        </View>
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    loader: { marginVertical: 20, alignItems: "center" },
    placeCard: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    placeName: { fontWeight: "bold", fontSize: 16 },
    placeCategory: { fontStyle: "italic", color: "#555" },
});
