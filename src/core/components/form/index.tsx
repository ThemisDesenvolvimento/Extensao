/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

interface Props{
    children: React.ReactNode;
    onSubmit(): void;
}

interface IForm {
    submit(): void;
}

const Context = React.createContext<IForm | null>(null);
export function Form(props: Props){
	//const dialog = useDialog();
	function walkAllChildren(
		root: React.ReactNode,
		callback: (
          element: React.ReactNode,
          parents: readonly React.ReactNode[]
        ) => void
	) {
		function walk(element: React.ReactNode, parents: readonly React.ReactNode[]) {
			if (element === null || element === undefined) return;
			callback(element, parents);

			const newParents = [...parents, element];
			const children = (element as any).props?.children;
			React.Children.toArray(children).forEach((child) => {
				walk(child, newParents);
			});
		}

		walk(root, []);
	}

	const submit = () => {
		const requiredInputs: string[] = [];
		const invalidInputs: string[] = [];
		walkAllChildren({ props } as React.ReactNode, (e: any, _parents) => {
			const isCustomInput = e.type?.name?.includes("CustomTextInput");
			const isCustomNumberInput = e.type?.name?.includes("NumberInput");
			const isCustomPicker = e.type?.name?.includes("customPicker");

			if (isCustomInput || isCustomPicker || isCustomNumberInput) {
				const inputHasValue = !!e.props.value && !!String(e.props.value).trim();
				const inputRequired = e.props.required || e.props.obrigatorio;

				const inputPattern: RegExp | undefined = e.props.pattern;
				const value = String(e.props.value);

				if(!inputHasValue && inputRequired) {
					requiredInputs.push("* " + (e.props.title ?? e.props.label ?? e.props.titulo));
				}

				if(inputHasValue && inputPattern && !value.match(inputPattern)){
					invalidInputs.push(e.props.title ?? e.props.label);
				}
			}
		});

		if(requiredInputs.length > 0){
			const requiredFieldsMessage = `Os campos não foram informados:\r\n${requiredInputs.join("\r\n")}`;
			const invalidFieldsMessage = `Os seguintes campos estão no formato inválido: \r\n${invalidInputs.join(", ")}`;
			const message: string = ""
            + (requiredInputs.length > 0? requiredFieldsMessage: "")
            + (invalidInputs.length > 0? ` \r\n \r\n ${invalidFieldsMessage}`: "");

			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: "Campos Inválidos",
				textBody: message,
				button: "OK",
			});
		}
		else
			props.onSubmit();
	};
	return <Context.Provider value={{
		submit
	}}>
		{props.children}
	</Context.Provider>;
}

export function useForm(){
	return React.useContext(Context) as IForm;
}