import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import ReactFlowNode from '../ReactFlowNode';

vi.mock('reactflow', () => ({
	Handle: ({ type, position, className }: any) => (
		<div data-testid={`handle-${type}`} data-position={position} className={className} />
	),
	Position: {
		Left: 'left',
		Right: 'right',
	},
}));

describe('ReactFlowNode', () => {
	const mockData = {
		label: 'Test Form',
	};

	const renderComponent = () => {
		return render(<ReactFlowNode data={mockData} />);
	};

	it('renders the node with correct structure', () => {
		renderComponent();

		const container = screen.getByTestId('react-flow-node');
		expect(container).toHaveClass(
			'flex',
			'items-center',
			'gap-x-2',
			'border',
			'border-gray-300',
			'px-2',
			'py-1',
			'rounded-lg',
			'w-[150px]'
		);

		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', '/src/assets/form-image.png');
		expect(image).toHaveAttribute('alt', 'form');
		expect(image).toHaveClass('w-8', 'h-8', 'rounded-lg');

		expect(screen.getByText('Form')).toHaveClass('text-xs', 'text-gray-500');
		expect(screen.getByText('Test Form')).toHaveClass('text-sm', 'text-black');
	});

	it('renders both source and target handles with correct positions', () => {
		renderComponent();

		const targetHandle = screen.getByTestId('handle-target');
		expect(targetHandle).toHaveAttribute('data-position', 'left');
		expect(targetHandle).toHaveClass('w-2', 'h-2');

		const sourceHandle = screen.getByTestId('handle-source');
		expect(sourceHandle).toHaveAttribute('data-position', 'right');
		expect(sourceHandle).toHaveClass('w-2', 'h-2');
	});

	it('renders with different label text', () => {
		const differentData = {
			label: 'Different Form',
		};
		render(<ReactFlowNode data={differentData} />);

		expect(screen.getByText('Different Form')).toBeInTheDocument();
	});
});
