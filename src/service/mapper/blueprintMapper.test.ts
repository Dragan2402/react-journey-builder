import { BlueprintGraphDto, NodeDto, Form } from '../../types/dto/blueprint';
import { mapBlueprintGraphDtoToBlueprintNodes } from './blueprintMapper';

describe('blueprintMapper', () => {
	describe('mapBlueprintGraphDtoToBlueprintNodes', () => {
		it('should map blueprint graph DTO to blueprint nodes correctly', () => {
			const mockBlueprint: BlueprintGraphDto = {
				$schema: 'schema',
				blueprint_id: 'blueprint1',
				tenant_id: 'tenant1',
				name: 'Test Blueprint',
				description: 'Test Description',
				category: 'Test Category',
				nodes: [
					{
						id: 'node1',
						position: { x: 0, y: 0 },
						type: 'form',
						data: {
							id: 'comp1',
							component_key: 'key1',
							component_type: 'type1',
							component_id: 'form1',
							name: 'Node 1',
							prerequisites: ['node2'],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
					{
						id: 'node2',
						position: { x: 100, y: 100 },
						type: 'form',
						data: {
							id: 'comp2',
							component_key: 'key2',
							component_type: 'type2',
							component_id: 'form2',
							name: 'Node 2',
							prerequisites: [],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
				],
				edges: [],
				forms: [
					{
						id: 'form1',
						name: 'Form 1',
						description: 'Form 1 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {
								prop1: {
									avantos_type: 'string',
									title: 'Property 1',
									type: 'string',
								},
							},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
					{
						id: 'form2',
						name: 'Form 2',
						description: 'Form 2 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {
								prop2: {
									avantos_type: 'string',
									title: 'Property 2',
									type: 'string',
								},
							},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
				],
			};

			const result = mapBlueprintGraphDtoToBlueprintNodes(mockBlueprint);

			expect(result).toHaveLength(2);

			expect(result[0]).toEqual({
				id: 'node1',
				position: { x: 0, y: 0 },
				type: 'form',
				data: {
					label: 'Node 1',
					formName: 'Form 1',
					predecessors: ['node2'],
					properties: [
						{
							id: 'prop1',
							name: 'Property 1',
							nodeId: 'node1',
							nodeName: 'Node 1',
						},
					],
				},
			});

			expect(result[1]).toEqual({
				id: 'node2',
				position: { x: 100, y: 100 },
				type: 'form',
				data: {
					label: 'Node 2',
					formName: 'Form 2',
					predecessors: [],
					properties: [
						{
							id: 'prop2',
							name: 'Property 2',
							nodeId: 'node2',
							nodeName: 'Node 2',
						},
					],
				},
			});
		});

		it('should handle nodes without associated forms', () => {
			const mockBlueprint: BlueprintGraphDto = {
				$schema: 'schema',
				blueprint_id: 'blueprint1',
				tenant_id: 'tenant1',
				name: 'Test Blueprint',
				description: 'Test Description',
				category: 'Test Category',
				nodes: [
					{
						id: 'node1',
						position: { x: 0, y: 0 },
						type: 'default',
						data: {
							id: 'comp1',
							component_key: 'key1',
							component_type: 'type1',
							component_id: 'nonExistentForm',
							name: 'Node 1',
							prerequisites: [],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
				],
				edges: [],
				forms: [],
			};

			const result = mapBlueprintGraphDtoToBlueprintNodes(mockBlueprint);

			expect(result).toHaveLength(1);
			expect(result[0].data.properties).toEqual([]);
		});

		it('should handle complex predecessor relationships', () => {
			const mockBlueprint: BlueprintGraphDto = {
				$schema: 'schema',
				blueprint_id: 'blueprint1',
				tenant_id: 'tenant1',
				name: 'Test Blueprint',
				description: 'Test Description',
				category: 'Test Category',
				nodes: [
					{
						id: 'node1',
						position: { x: 0, y: 0 },
						type: 'default',
						data: {
							id: 'comp1',
							component_key: 'key1',
							component_type: 'type1',
							component_id: 'form1',
							name: 'Node 1',
							prerequisites: ['node2', 'node3'],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
					{
						id: 'node2',
						position: { x: 100, y: 100 },
						type: 'default',
						data: {
							id: 'comp2',
							component_key: 'key2',
							component_type: 'type2',
							component_id: 'form2',
							name: 'Node 2',
							prerequisites: ['node3'],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
					{
						id: 'node3',
						position: { x: 200, y: 200 },
						type: 'default',
						data: {
							id: 'comp3',
							component_key: 'key3',
							component_type: 'type3',
							component_id: 'form3',
							name: 'Node 3',
							prerequisites: [],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
				],
				edges: [],
				forms: [
					{
						id: 'form1',
						name: 'Form 1',
						description: 'Form 1 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
					{
						id: 'form2',
						name: 'Form 2',
						description: 'Form 2 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
					{
						id: 'form3',
						name: 'Form 3',
						description: 'Form 3 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
				],
			};

			const result = mapBlueprintGraphDtoToBlueprintNodes(mockBlueprint);

			expect(result).toHaveLength(3);
			expect(result[0].data.predecessors).toEqual(['node3', 'node2']);
			expect(result[1].data.predecessors).toEqual(['node3']);
			expect(result[2].data.predecessors).toEqual([]);
		});

		it('should handle circular dependencies in predecessors', () => {
			const mockBlueprint: BlueprintGraphDto = {
				$schema: 'schema',
				blueprint_id: 'blueprint1',
				tenant_id: 'tenant1',
				name: 'Test Blueprint',
				description: 'Test Description',
				category: 'Test Category',
				nodes: [
					{
						id: 'node1',
						position: { x: 0, y: 0 },
						type: 'default',
						data: {
							id: 'comp1',
							component_key: 'key1',
							component_type: 'type1',
							component_id: 'form1',
							name: 'Node 1',
							prerequisites: ['node2'],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
					{
						id: 'node2',
						position: { x: 100, y: 100 },
						type: 'default',
						data: {
							id: 'comp2',
							component_key: 'key2',
							component_type: 'type2',
							component_id: 'form2',
							name: 'Node 2',
							prerequisites: ['node1'],
							permitted_roles: [],
							input_mapping: {},
							sla_duration: { number: 1, unit: 'day' },
							approval_required: false,
							approval_roles: [],
						},
					},
				],
				edges: [],
				forms: [
					{
						id: 'form1',
						name: 'Form 1',
						description: 'Form 1 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
					{
						id: 'form2',
						name: 'Form 2',
						description: 'Form 2 Description',
						is_reusable: false,
						field_schema: {
							type: 'object',
							properties: {},
							required: [],
						},
						ui_schema: {
							type: 'object',
							elements: [],
						},
						dynamic_field_config: {},
					},
				],
			};

			const result = mapBlueprintGraphDtoToBlueprintNodes(mockBlueprint);

			expect(result).toHaveLength(2);
			expect(result[0].data.predecessors).toEqual(['node2']);
			expect(result[1].data.predecessors).toEqual(['node1']);
		});
	});
});
