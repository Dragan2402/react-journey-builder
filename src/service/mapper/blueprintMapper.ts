import { BlueprintGraph, Node as GraphNode, Form } from '../../types/dto/blueprint';
import { BlueprintNode, NodeProperty } from '../../types/internal/blueprintNode';

export const mapBlueprintGraphDtoToBlueprintNodes = (blueprint: BlueprintGraph): BlueprintNode[] => {
	var nodesDictionary = blueprint.nodes.reduce<Record<string, GraphNode>>((acc, node) => {
		acc[node.id] = node;

		return acc;
	}, {});

	const nodes: BlueprintNode[] = blueprint.nodes.map((node) => {
		const nodeForm = blueprint.forms.find((f) => f.id === node.data.component_id);

		return {
			id: node.id,
			position: node.position,
			type: node.type,
			data: {
				label: node.data.name,
				predecessors: getNodePredecessors(node, nodesDictionary),
				formName: nodeForm?.name ?? '',
				properties: nodeForm ? mapFormProperties(nodeForm) : [],
			},
		} as BlueprintNode;
	});

	return nodes;
};

const getNodePredecessors = (node: GraphNode, nodesDictionary: Record<string, GraphNode>) => {
	const queue = [...node.data.prerequisites];
	const visited: Record<string, boolean> = {};
	const predecessors: string[] = [];
	while (queue.length !== 0) {
		const currentVisitingNodeId = queue.shift();

		if (!currentVisitingNodeId) {
			return;
		}

		if (visited[currentVisitingNodeId]) {
			continue;
		}

		var currentVisitingNode = nodesDictionary[currentVisitingNodeId];

		queue.push(...currentVisitingNode.data.prerequisites);

		visited[currentVisitingNodeId] = true;

		predecessors.push(currentVisitingNodeId);
	}

	return predecessors;
};

const mapFormProperties = (form: Form): NodeProperty[] => {
	const formProperties = form.field_schema.properties;

	const mappedProperties: NodeProperty[] = [];

	for (let propertyId in formProperties) {
		const property = formProperties[propertyId];
		mappedProperties.push({
			id: propertyId,
			name: property.title ?? '',
			// values check from input mappings
		});
	}

	return mappedProperties;
};
