import { ItemDaVenda } from "@models/businessObject/itemDaVenda";


export interface IVenda {
    valorTotal: number;
}

export interface IVendaService{
    finalizarVenda(itens: ItemDaVenda[]): Promise<void>;
    obtenhaVendasDoDia(dataISO: string): Promise<IVenda[]>;
}