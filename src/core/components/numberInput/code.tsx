import Hooks from "@utils/hooks";
import { Props } from "./interface";

class NumberInputModel{
    inputEstaFocado!: boolean;
	valor: number = 0;
	valorInput: string = "";
}

export class NumberInputCode{
    props: Props;
	casasDecimais: number;
    interno: NumberInputModel;

    constructor(props: Props){
    	this.props = props;
    	this.casasDecimais = (props.casasDecimais ?? 2);
    	this.interno = Hooks.useModel(new NumberInputModel);
    }

    definirValorDoInput(novoValor: string){
    	if(!novoValor.isNullOrEmpty() && novoValor !== "NaN"){
    		const numeroEmString = !novoValor ? "0" : novoValor.removeAll(".", ",", "%");
    		const numeroFormatado = numeroEmString.padStart(3, "0");
    		const indiceCasasDecimais = numeroFormatado.length - this.casasDecimais;
    		const valorTratado = numeroFormatado.substring(0, indiceCasasDecimais) + "." + numeroFormatado.substring(indiceCasasDecimais);

    		let valorConvertido = parseFloat(valorTratado);
    		if(this.props.tipo === "percentual" && valorConvertido > 100)
    			valorConvertido = 100;

    		this.interno.valor = valorConvertido;
    		this.interno.valorInput = valorConvertido.toMoeda("", this.casasDecimais);
    	} else {
    		this.interno.valor = 0;
    		this.interno.valorInput = String.Empty;
    	}

    	this.atribuirBinding(this.interno.valor);
    }

    aoFocarNoInput(){
    	this.interno.inputEstaFocado = true;
    	this.props.onFocus && this.props.onFocus(this.props.value);
    }

    aoSairDoInput(){
    	this.interno.inputEstaFocado = false;
    	this.props.onBlur && this.props.onBlur(this.props.value);
    }

    private atribuirBinding(novoValor: number | null){
    	if(!this.props.required && (novoValor === 0))
    		novoValor = null;

    	this.props.setValue && this.props.setValue(novoValor!);
    }
}