import { BlueprintNode, GlobalFormProvider, NodeProperty } from '../internal/blueprintNode';
import { Edge } from '../internal/edge';

export interface BlueprintState {
	edges: Edge[];
	nodes: BlueprintNode[];
	globalProperties: GlobalFormProvider[];
}

export type BlueprintAction =
	| {
			type: BLUEPRINT_ACTION.INIT;
			payload: { nodes: BlueprintNode[]; edges: Edge[]; globalProperties: GlobalFormProvider[] };
	  }
	| {
			type: BLUEPRINT_ACTION.UPDATE_PROPERTY;
			payload: { property: NodeProperty; inheritingProperty: NodeProperty };
	  }
	| {
			type: BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE;
			payload: { property: NodeProperty };
	  };

export enum BLUEPRINT_ACTION {
	INIT = 'INIT',
	UPDATE_PROPERTY = 'UPDATE_PROPERTY',
	DELETE_PROPERTY_INHERITANCE = 'DELETE_PROPERTY_INHERITANCE',
}
