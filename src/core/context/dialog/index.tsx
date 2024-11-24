import React from "react";
import { Colors } from "@context/theme";
import { CheckCircle, Info, XCircle } from "phosphor-react-native";
import { ReactNode, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Animated, ViewStyle } from "react-native";
import { styles } from "./styles";
import { Context } from "./context";

interface Props{
    children: React.ReactNode;
}

let resolveQuestion: (value: boolean | PromiseLike<boolean>) => void;
//let rejectQuestion: (value: boolean | PromiseLike<boolean>) => void;

const defaultTop = Dimensions.get("window").height;
export function DialogContext(props: Props){
	const [offsetY] = useState(new Animated.Value(defaultTop));
	const [isQuestion, setIsQuestion] = useState(false);
	const [message, setMessage] = useState("Informe o Login e Senha para continuar");
	const [renderedComponent, setRenderedComponent] = useState<ReactNode | undefined>();

	const moveUpAnimation = () => {
		Animated.timing(offsetY, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true
		}).start();
	};

	const moveDownAnimation = () => {
		Animated.timing(offsetY, {
			toValue: defaultTop,
			duration: 100,
			useNativeDriver: true
		}).start();
	};


	const showModal = moveUpAnimation;
	const hideModal = moveDownAnimation;

	const showMessage = (message: string) => {
		setIsQuestion(false);
		setRenderedComponent(undefined);
		setMessage(message);

		showModal();
	};

	const showQuestion = async (message: string): Promise<boolean> => {
		setIsQuestion(true);
		setRenderedComponent(undefined);
		setMessage(message);
		return new Promise<boolean>( (resolve) => {
			resolveQuestion = resolve,
			//rejectQuestion = reject;

			showModal();
		} );
	};

	const showComponent = (render: React.ReactNode) => {
		setRenderedComponent(render);
		showModal();
	};

	const buttonOKClick = () => {
		if(isQuestion)
			resolveQuestion(true);

		hideModal();
	};

	// const buttonCancelClick = () => {
	// 	resolveQuestion(false);
	// 	hideModal();
	// };

	const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
		transform: [
			{translateY: offsetY}
		]
	};
	return (
		<Context.Provider value={{
			showMessage,
			showQuestion,
			showComponent,
			hideModal
		}}>
			{ props.children }

			<Animated.View style={[styles.container, animatedStyle]}>
				{renderedComponent ? renderedComponent
					:
					<View style={styles.dialogContainer}>
						<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
							<Info color={Colors.lightBlue} weight="fill"/>

							<Text style={styles.title}>Mensagem ao usuário</Text>
						</View>

						{/*<View style={styles.titleDivider}></View>*/}

						<View style={styles.secondaryContainer}>
							<View style={styles.textContainer}>
								<Text style={styles.message}>{ message }</Text>
							</View>


							<View style={styles.buttonsContainer}>

								{isQuestion?

									<TouchableOpacity style={[styles.buttonOK, { marginEnd: 5, backgroundColor: Colors.red, }]}
										onPress={buttonOKClick}
									>
										<XCircle color="#FFF" />
										<Text style={styles.buttonText}>Cancela</Text>
									</TouchableOpacity>

									: null
								}


								<TouchableOpacity style={[styles.buttonOK, { marginStart: 5, backgroundColor: Colors.lightBlue, }]}
									onPress={buttonOKClick}
								>
									<CheckCircle color="#FFF" />
									<Text style={styles.buttonText}>Confirma</Text>
								</TouchableOpacity>

							</View>
						</View>
					</View>
				}
			</Animated.View>
		</Context.Provider>
	);
}