import { BlueprintNode, NodeProperty } from '../types/internal/blueprintNode';
import { Edge } from '../types/internal/edge';
import { BLUEPRINT_ACTION, BlueprintAction, BlueprintState } from '../types/state/blueprintState';
import { blueprintReducer } from './blueprintReducer';

describe('blueprintReducer', () => {
	const mockInitialState: BlueprintState = {
		nodes: [],
		edges: [],
		globalProperties: [],
	};

	const mockNode: BlueprintNode = {
		id: 'node1',
		position: { x: 0, y: 0 },
		type: 'test',
		data: {
			label: 'Test Node',
			properties: [
				{
					id: 'prop1',
					name: 'Property 1',
					nodeId: 'node1',
					nodeName: 'Test Node',
				},
			],
			predecessors: [],
		},
	};

	const mockEdge: Edge = {
		id: 'edge1',
		source: 'node1',
		target: 'node2',
	};

	describe('INIT action', () => {
		it('should initialize the state with provided nodes, edges and global properties', () => {
			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.INIT,
				payload: {
					nodes: [mockNode],
					edges: [mockEdge],
					globalProperties: [],
				},
			};

			const newState = blueprintReducer(mockInitialState, action);

			expect(newState.nodes).toEqual([mockNode]);
			expect(newState.edges).toEqual([mockEdge]);
			expect(newState.globalProperties).toEqual([]);
		});
	});

	describe('UPDATE_PROPERTY action', () => {
		const stateWithNode: BlueprintState = {
			...mockInitialState,
			nodes: [mockNode],
		};

		it('should update property inheritance', () => {
			const inheritingProperty: NodeProperty = {
				id: 'prop2',
				name: 'Property 2',
				nodeId: 'node2',
				nodeName: 'Test Node 2',
			};

			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.UPDATE_PROPERTY,
				payload: {
					property: mockNode.data.properties[0],
					inheritingProperty,
				},
			};

			const newState = blueprintReducer(stateWithNode, action);
			expect(newState.nodes[0].data.properties[0].inheritingProperty).toEqual(inheritingProperty);
		});

		it('should return unchanged state when node is not found', () => {
			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.UPDATE_PROPERTY,
				payload: {
					property: { ...mockNode.data.properties[0], nodeId: 'nonExistentNode' },
					inheritingProperty: mockNode.data.properties[0],
				},
			};

			const newState = blueprintReducer(stateWithNode, action);
			expect(newState).toEqual(stateWithNode);
		});

		it('should return unchanged state when property is not found', () => {
			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.UPDATE_PROPERTY,
				payload: {
					property: { ...mockNode.data.properties[0], id: 'nonExistentProperty' },
					inheritingProperty: mockNode.data.properties[0],
				},
			};

			const newState = blueprintReducer(stateWithNode, action);
			expect(newState).toEqual(stateWithNode);
		});
	});

	describe('DELETE_PROPERTY_INHERITANCE action', () => {
		const stateWithInheritance: BlueprintState = {
			...mockInitialState,
			nodes: [
				{
					...mockNode,
					data: {
						...mockNode.data,
						properties: [
							{
								...mockNode.data.properties[0],
								inheritingProperty: {
									id: 'prop2',
									name: 'Property 2',
									nodeId: 'node2',
									nodeName: 'Test Node 2',
								},
							},
						],
					},
				},
			],
		};

		it('should remove property inheritance', () => {
			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE,
				payload: {
					property: stateWithInheritance.nodes[0].data.properties[0],
				},
			};

			const newState = blueprintReducer(stateWithInheritance, action);
			expect(newState.nodes[0].data.properties[0].inheritingProperty).toBeUndefined();
		});

		it('should return unchanged state when node is not found', () => {
			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE,
				payload: {
					property: { ...mockNode.data.properties[0], nodeId: 'nonExistentNode' },
				},
			};

			const newState = blueprintReducer(stateWithInheritance, action);
			expect(newState).toEqual(stateWithInheritance);
		});

		it('should return unchanged state when property is not found', () => {
			const action: BlueprintAction = {
				type: BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE,
				payload: {
					property: { ...mockNode.data.properties[0], id: 'nonExistentProperty' },
				},
			};

			const newState = blueprintReducer(stateWithInheritance, action);
			expect(newState).toEqual(stateWithInheritance);
		});
	});

	describe('Unsupported action', () => {
		it('should throw error for unsupported action type', () => {
			const action = {
				type: 'UNSUPPORTED_ACTION' as BLUEPRINT_ACTION,
				payload: {},
			} as unknown as BlueprintAction;

			expect(() => blueprintReducer(mockInitialState, action)).toThrow('Unsupported action');
		});
	});
});
