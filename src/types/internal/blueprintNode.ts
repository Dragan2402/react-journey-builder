export interface BlueprintNode {
	name: string;
	properties: NodeProperty[];
	parents: BlueprintNode[];
}

export interface NodeProperty {
	name: string;
}
