import { BlueprintGraphDto, NodeDto as GraphNode, Form } from '../../types/dto/blueprint';
import { BlueprintNode, NodePredecessor, NodeProperty } from '../../types/internal/blueprintNode';

export const mapBlueprintGraphDtoToBlueprintNodes = (blueprint: BlueprintGraphDto): BlueprintNode[] => {
	var nodesDictionary = blueprint.nodes.reduce<Record<string, GraphNode>>((acc, node) => {
		acc[node.id] = node;

		return acc;
	}, {});

	const nodes: BlueprintNode[] = blueprint.nodes.map((node) => {
		const nodeForm = blueprint.forms.find((f) => f.id === node.data.component_id);
		const directEdgesToTheNode = blueprint.edges.filter((e) => e.target === node.id);

		return {
			id: node.id,
			position: node.position,
			type: node.type,
			data: {
				label: node.data.name,
				predecessors: getNodePredecessors(node, nodesDictionary).map((predecessor) => {
					return {
						id: predecessor.id,
						direct: directEdgesToTheNode.some((e) => e.source === predecessor.id),
					};
				}),
				formName: nodeForm?.name ?? '',
				properties: nodeForm ? mapFormProperties(nodeForm, node) : [],
			},
		} as BlueprintNode;
	});

	return nodes;
};

// Get each node predecessor by traversing the graph, using BFS. Reverse the result to get the correct order.
const getNodePredecessors = (node: GraphNode, nodesDictionary: Record<string, GraphNode>) => {
	const queue = [...node.data.prerequisites];
	const visited: Record<string, boolean> = {};
	const predecessors: NodePredecessor[] = [];

	while (queue.length !== 0) {
		const currentVisitingNodeId = queue.shift();

		if (!currentVisitingNodeId || visited[currentVisitingNodeId] || currentVisitingNodeId === node.id) {
			continue;
		}

		var currentVisitingNode = nodesDictionary[currentVisitingNodeId];

		queue.push(...currentVisitingNode.data.prerequisites);

		visited[currentVisitingNodeId] = true;

		predecessors.push({
			id: currentVisitingNodeId,
			direct: false,
		});
	}

	return predecessors.reverse();
};

const mapFormProperties = (form: Form, node: GraphNode): NodeProperty[] => {
	const formProperties = form.field_schema.properties;

	const mappedProperties: NodeProperty[] = [];

	for (let propertyId in formProperties) {
		const property = formProperties[propertyId];
		mappedProperties.push({
			id: propertyId,
			name: property.title ?? '',
			nodeId: node.id,
			nodeName: node.data.name,
			// values check from input mappings
		});
	}

	return mappedProperties;
};
