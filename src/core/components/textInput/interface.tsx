export interface TextInputProps{
    type?: "password";
    label: string;
    value: string;
    required?: boolean;
    disabled?: boolean;
    setValue?(newValue: string): void;
}