import { describe, it, expect, beforeEach, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { BlueprintContext } from '@/context/BlueprintContext';
import { BlueprintNode, NodeProperty, GlobalFormProvider } from '@/types/internal/blueprintNode';
import { BlueprintState } from '@/types/state/blueprintState';
import { Edge } from '@/types/internal/edge';
import { BLUEPRINT_ACTION } from '@/types/state/blueprintState';

import PrefillForm from '../PrefillForm';

const mockNode: BlueprintNode = {
	id: 'node1',
	type: 'form',
	position: { x: 0, y: 0 },
	data: {
		label: 'Test Form',
		properties: [
			{ id: 'prop1', name: 'Property 1', nodeId: 'node1', nodeName: 'Test Form' },
			{ id: 'prop2', name: 'Property 2', nodeId: 'node1', nodeName: 'Test Form' },
		],
		predecessors: ['node2'],
	},
};

const mockGlobalProperties: GlobalFormProvider[] = [
	{
		id: 'global1',
		name: 'Global Properties',
		properties: [
			{ id: 'globalProp1', name: 'Global Property 1', nodeId: 'global1', nodeName: 'Global Properties' },
			{ id: 'globalProp2', name: 'Global Property 2', nodeId: 'global1', nodeName: 'Global Properties' },
		],
	},
];

const mockNodes: BlueprintNode[] = [
	mockNode,
	{
		id: 'node2',
		type: 'form',
		position: { x: 100, y: 100 },
		data: {
			label: 'Predecessor Form',
			properties: [
				{ id: 'predProp1', name: 'Predecessor Property 1', nodeId: 'node2', nodeName: 'Predecessor Form' },
				{ id: 'predProp2', name: 'Predecessor Property 2', nodeId: 'node2', nodeName: 'Predecessor Form' },
			],
			predecessors: [],
		},
	},
];

const mockEdges: Edge[] = [{ id: 'edge1', source: 'node2', target: 'node1' }];

const mockContextValue = {
	state: {
		nodes: mockNodes,
		edges: mockEdges,
		globalProperties: mockGlobalProperties,
	} as BlueprintState,
	dispatch: vi.fn(),
};

describe('PrefillForm', () => {
	const mockHandleSheetOpenChange = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the form title and description', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PrefillForm selectedNode={mockNode} handleSheetOpenChange={mockHandleSheetOpenChange} />
			</BlueprintContext.Provider>
		);

		expect(screen.getByText('Prefill Test Form')).toBeInTheDocument();
		expect(screen.getByText('Prefill fields for this form.')).toBeInTheDocument();
	});

	it('renders property buttons for each property', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PrefillForm selectedNode={mockNode} handleSheetOpenChange={mockHandleSheetOpenChange} />
			</BlueprintContext.Provider>
		);

		expect(screen.getByText('prop1')).toBeInTheDocument();
		expect(screen.getByText('prop2')).toBeInTheDocument();
	});

	it('shows PropertySelection when a property is clicked', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PrefillForm selectedNode={mockNode} handleSheetOpenChange={mockHandleSheetOpenChange} />
			</BlueprintContext.Provider>
		);

		const propertyButton = screen.getByText('prop1');
		fireEvent.click(propertyButton);

		expect(screen.getByText('Global Properties')).toBeInTheDocument();
	});

	it('dispatches UPDATE_PROPERTY action when a property is selected', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PrefillForm selectedNode={mockNode} handleSheetOpenChange={mockHandleSheetOpenChange} />
			</BlueprintContext.Provider>
		);

		const propertyButton = screen.getByText('prop1');
		fireEvent.click(propertyButton);

		const globalPropertiesAccordion = screen.getByText('Global Properties');
		fireEvent.click(globalPropertiesAccordion);

		const globalPropertyButton = screen.getByText('globalProp1');
		fireEvent.click(globalPropertyButton);

		const selectButton = screen.getByText('Select');
		fireEvent.click(selectButton);

		expect(mockContextValue.dispatch).toHaveBeenCalledWith({
			type: BLUEPRINT_ACTION.UPDATE_PROPERTY,
			payload: {
				property: expect.objectContaining({ id: 'prop1' }),
				inheritingProperty: expect.objectContaining({ id: 'globalProp1' }),
			},
		});
	});

	it('dispatches DELETE_PROPERTY_INHERITANCE action when delete button is clicked', () => {
		const nodeWithInheritance = {
			...mockNode,
			data: {
				...mockNode.data,
				properties: [
					{
						...mockNode.data.properties[0],
						inheritingProperty: {
							id: 'globalProp1',
							name: 'Global Property 1',
							nodeId: 'global1',
							nodeName: 'Global Properties',
						},
					},
					mockNode.data.properties[1],
				],
			},
		};

		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PrefillForm selectedNode={nodeWithInheritance} handleSheetOpenChange={mockHandleSheetOpenChange} />
			</BlueprintContext.Provider>
		);

		const deleteButton = screen.getByRole('button', { name: '' });
		fireEvent.click(deleteButton);

		expect(mockContextValue.dispatch).toHaveBeenCalledWith({
			type: BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE,
			payload: {
				property: expect.objectContaining({ id: 'prop1' }),
			},
		});
	});

	it('calls handleSheetOpenChange when sheet is closed', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PrefillForm selectedNode={mockNode} handleSheetOpenChange={mockHandleSheetOpenChange} />
			</BlueprintContext.Provider>
		);

		const sheet = screen.getByRole('dialog');
		fireEvent.keyDown(sheet, { key: 'Escape' });

		expect(mockHandleSheetOpenChange).toHaveBeenCalledWith(false);
	});
});
