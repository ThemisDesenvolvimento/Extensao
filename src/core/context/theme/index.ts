import { StyleSheet } from "react-native";

const TextFonts = {
	light: "Poppins_300Light",
	regular: "Poppins_400Regular",
	bold: "Poppins_700Bold",
	mediumItalic: "Poppins_500Medium_Italic"
};

const FontWeights = {
	light: "300",
	regular: "400",
	bold: "700",
	black: "900"
};

const Colors = {
	lightBlue: "#03b6fc",
	red: "red",
	grayBackground: "rgba(112, 112, 112, 0.3)"
};

const Theme = StyleSheet.create({
	background: {
		backgroundColor: "rgba(245, 245, 245, 0.9)"
	},

	text: {
		fontFamily: TextFonts.regular,
		color: "#686466"
	},

	textBold: {

	},
});



export { Theme, TextFonts, FontWeights, Colors };