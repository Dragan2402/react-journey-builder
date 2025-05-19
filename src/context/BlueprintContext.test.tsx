import { useContext } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';

import { getBlueprint, getGlobalFormProviders } from '../api/api';
import { BlueprintContext, BlueprintProvider } from './BlueprintContext';

vi.mock('../api/api', () => ({
	getBlueprint: vi.fn(),
	getGlobalFormProviders: vi.fn(),
}));

vi.mock('../service/mapper/blueprintMapper', () => ({
	mapBlueprintGraphDtoToBlueprintNodes: vi.fn(),
}));

describe('BlueprintContext', () => {
	const mockBlueprint = {
		edges: [
			{ source: 'node1', target: 'node2' },
			{ source: 'node2', target: 'node3' },
		],
		nodes: [],
	};

	const mockGlobalFormProviders = ['provider1', 'provider2'];

	beforeEach(() => {
		vi.clearAllMocks();
		(getBlueprint as any).mockResolvedValue(mockBlueprint);
		(getGlobalFormProviders as any).mockReturnValue(mockGlobalFormProviders);
	});

	it('should provide initial state', () => {
		const TestComponent = () => {
			const context = useContext(BlueprintContext);
			return <div data-testid="test">{JSON.stringify(context?.state)}</div>;
		};

		render(
			<BlueprintProvider>
				<TestComponent />
			</BlueprintProvider>
		);

		expect(screen.getByTestId('test')).toHaveTextContent(
			JSON.stringify({ edges: [], nodes: [], globalProperties: [] })
		);
	});

	it('should load blueprint data and update state', async () => {
		const TestComponent = () => {
			const context = useContext(BlueprintContext);
			return <div data-testid="test">{JSON.stringify(context?.state)}</div>;
		};

		render(
			<BlueprintProvider>
				<TestComponent />
			</BlueprintProvider>
		);

		await waitFor(() => {
			expect(getBlueprint).toHaveBeenCalled();
			expect(getGlobalFormProviders).toHaveBeenCalled();
		});
	});

	it('should handle API errors gracefully', async () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		(getBlueprint as any).mockRejectedValue(new Error('API Error'));

		render(
			<BlueprintProvider>
				<div>Test</div>
			</BlueprintProvider>
		);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Failed to setup blueprint context', expect.any(Error));
		});

		consoleSpy.mockRestore();
	});

	it('should provide dispatch function to children', () => {
		const TestComponent = () => {
			const context = useContext(BlueprintContext);
			return (
				<div>
					<div data-testid="dispatch">{context?.dispatch ? 'has-dispatch' : 'no-dispatch'}</div>
				</div>
			);
		};

		render(
			<BlueprintProvider>
				<TestComponent />
			</BlueprintProvider>
		);

		expect(screen.getByTestId('dispatch')).toHaveTextContent('has-dispatch');
	});
});
