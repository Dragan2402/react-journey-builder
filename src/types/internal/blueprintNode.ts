export interface BlueprintNode {
	id: string;
	position: NodePosition;
	type: string;
	data: {
		label: string;
		properties: NodeProperty[];
		predecessors: string[];
	};
}

export interface NodeProperty {
	id: string;
	name: string;
	nodeId: string;
	nodeName: string;
	inheritingProperty?: NodeProperty;
}

interface NodePosition {
	x: number;
	y: number;
}

export interface GlobalFormProvider {
	id: string;
	name: string;
	properties: NodeProperty[];
}
