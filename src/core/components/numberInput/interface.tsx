export interface Props{
    label: string;
    value: number;
    mode?: "flat" | "outlined";
    tipo?: "percentual" | "valor" | "moeda";
    casasDecimais?: number;
    className?: string;
    textoAjuda?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    form?: string;
    tamanhoColuna?: number;
    eventoDeBotao?(): void;
    onBlur?(value: number): void;
    onFocus?(value: number): void;
    setValue?(value: number): void;
}