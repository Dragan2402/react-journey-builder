import { BlueprintNode } from '../internal/blueprintNode';

export interface BlueprintState {
	nodes: BlueprintNode[];
	counter: number;
}

export type BlueprintAction = {
	type: BLUEPRINT_ACTION.INIT;
	payload: { nodes: BlueprintNode[] };
};

export enum BLUEPRINT_ACTION {
	INIT = 'INIT',
	UPDATE_PROPERTY = 'UPDATE_PROPERTY',
	DELETE_PROPERTY = 'DELETE_PROPERTY',
}
