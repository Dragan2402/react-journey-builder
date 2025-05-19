export interface BlueprintNode {
	id: string;
	position: NodePosition;
	data: {
		label: string;
		properties: NodeProperty[];
		predecessors: string[];
	};
}

export interface NodeProperty {
	id: string;
	name: string;
	value?: PropertyValue;
}

interface NodePosition {
	x: number;
	y: number;
}

interface PropertyValue {
	sourceId: string;
	sourceName: string;
}
