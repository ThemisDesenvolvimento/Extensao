import { ItemDaVenda } from "@models/businessObject/itemDaVenda";

export interface IVendaService{
    finalizarVenda(itens: ItemDaVenda[]): Promise<void>;
}