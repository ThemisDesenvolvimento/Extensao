import { Colors, Theme } from "@context/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		height: "100%",
		width: "100%",

		alignItems: "center",
		justifyContent: "center",

		backgroundColor: Colors.grayBackground
	},

	dialogContainer: {
		minHeight: "35%",
		width: "90%",
		backgroundColor: "white",
		borderRadius: 15,
		alignItems: "center",
		paddingTop: 20,
		paddingHorizontal: 20
	},

	title: {
		fontSize: 18,
		padding: 5,
		color: Theme.text.color,
		//fontFamily: TextFonts.regular,
		marginTop: 5
	},

	titleDivider: {
		width: "100%",
		borderStyle: "solid",
		borderColor: "lightgray",
		borderWidth: StyleSheet.hairlineWidth
	},

	secondaryContainer: {
		flex: 1,
		width: "100%",
		height: "50%",
		alignItems: "center",
		flexDirection: "column",
		position: "relative",

	},

	textContainer: {
		height: "75%",
		width: "100%",
		justifyContent: "center",
		paddingHorizontal: 20
	},

	message: {
		//fontFamily: TextFonts.regular,
		textAlign: "center"
	},

	buttonsContainer: {
		height: "25%",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 20,
		borderBottomEndRadius: 20,
		borderBottomStartRadius: 20,
		borderStyle: "solid",
		borderTopColor: "lightgray",
		borderTopWidth: StyleSheet.hairlineWidth,
	},

	buttonCancel: {
		color: "#f74f5a",
		//fontFamily: TextFonts.bold,
		fontSize: 18,
	},

	buttonOK: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 3,
		borderRadius: 20,
		width: "50%"
	},

	buttonText: {
		color: "#FFF",
		//fontFamily: TextFonts.bold,
		marginStart: 5,
		marginTop: 5
	}
});