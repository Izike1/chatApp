import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
    },
    bgImage: {
        width:"100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: "100%",
        height: "75%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 100,
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: "#f57c00",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
})

export default styles;