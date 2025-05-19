import { describe, it, expect, beforeEach, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { BlueprintContext } from '@/context/BlueprintContext';
import { BlueprintNode, NodeProperty, GlobalFormProvider } from '@/types/internal/blueprintNode';
import { BlueprintState } from '@/types/state/blueprintState';
import { Edge } from '@/types/internal/edge';

import PropertySelection from '../PropertySelection';

// Mock data
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

describe('PropertySelection', () => {
	const mockSelectProperty = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders global properties section', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PropertySelection node={mockNode} selectProperty={mockSelectProperty} />
			</BlueprintContext.Provider>
		);

		expect(screen.getByText('Global Properties')).toBeInTheDocument();
	});

	it('renders predecessor properties section', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PropertySelection node={mockNode} selectProperty={mockSelectProperty} />
			</BlueprintContext.Provider>
		);

		expect(screen.getByText('Predecessor Form')).toBeInTheDocument();
	});

	it('disables select button when no property is selected', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PropertySelection node={mockNode} selectProperty={mockSelectProperty} />
			</BlueprintContext.Provider>
		);

		const selectButton = screen.getByText('Select');
		expect(selectButton).toBeDisabled();
	});

	it('calls selectProperty with undefined when cancel button is clicked', () => {
		render(
			<BlueprintContext.Provider value={mockContextValue}>
				<PropertySelection node={mockNode} selectProperty={mockSelectProperty} />
			</BlueprintContext.Provider>
		);

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		expect(mockSelectProperty).toHaveBeenCalledWith(undefined);
	});
});
