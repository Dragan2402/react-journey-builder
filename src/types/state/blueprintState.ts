import { BlueprintNode } from '../internal/blueprintNode';
import { Edge } from '../internal/edge';

export interface BlueprintState {
	edges: Edge[];
	nodes: BlueprintNode[];
	counter: number;
}

export type BlueprintAction = {
	type: BLUEPRINT_ACTION.INIT;
	payload: { nodes: BlueprintNode[]; edges: Edge[] };
};

export enum BLUEPRINT_ACTION {
	INIT = 'INIT',
	UPDATE_PROPERTY = 'UPDATE_PROPERTY',
	DELETE_PROPERTY = 'DELETE_PROPERTY',
}
