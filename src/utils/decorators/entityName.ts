import { Entity } from "@models/entity/baseEntity";
import "reflect-metadata";

const formatMetadataKey = Symbol("EntityName");

function EntityName(data: string) {
	return Reflect.metadata(formatMetadataKey, data);
}


function getEntityName<T extends new () => Entity>(target: T): string {
	return Reflect.getMetadata(formatMetadataKey, target);
}


export { EntityName, getEntityName };
