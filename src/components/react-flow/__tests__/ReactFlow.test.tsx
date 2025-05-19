import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import { BlueprintContext } from '../../../context/BlueprintContext';
import GraphFlow from '../ReactFlow';

vi.mock('reactflow', () => ({
	default: ({ children, nodes, edges, nodeTypes, onNodeClick }: any) => (
		<div data-testid="react-flow">
			<div data-testid="nodes">{JSON.stringify(nodes)}</div>
			<div data-testid="edges">{JSON.stringify(edges)}</div>
			<div data-testid="node-types">{JSON.stringify(Object.keys(nodeTypes))}</div>
			<button onClick={() => onNodeClick({}, { id: 'test-node' })}>Click Node</button>
			{children}
		</div>
	),
	Background: () => <div data-testid="background" />,
}));

describe('GraphFlow', () => {
	const mockSelectNode = vi.fn();
	const mockState = {
		nodes: [
			{
				id: '1',
				type: 'form',
				position: { x: 0, y: 0 },
				data: {
					label: 'Node 1',
					properties: [],
					predecessors: [],
				},
			},
			{
				id: '2',
				type: 'form',
				position: { x: 100, y: 100 },
				data: {
					label: 'Node 2',
					properties: [],
					predecessors: ['1'],
				},
			},
		],
		edges: [{ id: 'e1-2', source: '1', target: '2' }],
		globalProperties: [],
	};

	const renderComponent = () => {
		return render(
			<BlueprintContext.Provider value={{ state: mockState, dispatch: vi.fn() }}>
				<GraphFlow selectNode={mockSelectNode} />
			</BlueprintContext.Provider>
		);
	};

	it('renders the ReactFlow component with correct props', () => {
		renderComponent();

		expect(screen.getByTestId('react-flow')).toBeInTheDocument();
		expect(screen.getByTestId('background')).toBeInTheDocument();

		const nodesElement = screen.getByTestId('nodes');
		const edgesElement = screen.getByTestId('edges');
		const nodeTypesElement = screen.getByTestId('node-types');

		expect(JSON.parse(nodesElement.textContent!)).toEqual(mockState.nodes);
		expect(JSON.parse(edgesElement.textContent!)).toEqual(mockState.edges);
		expect(JSON.parse(nodeTypesElement.textContent!)).toEqual(['form']);
	});

	it('calls selectNode when a node is clicked', () => {
		renderComponent();

		const nodeButton = screen.getByText('Click Node');
		fireEvent.click(nodeButton);

		expect(mockSelectNode).toHaveBeenCalledWith('test-node');
	});
});
