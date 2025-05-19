import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BlueprintGraphDto } from '../types/dto/blueprint';
import { getBlueprint, getGlobalFormProviders } from './api';
import axios from './axios';

vi.mock('./axios', () => ({
	default: {
		get: vi.fn(),
	},
}));

describe('API Functions', () => {
	describe('getBlueprint', () => {
		const mockBlueprintData: BlueprintGraphDto = {
			$schema: 'schema',
			blueprint_id: 'blueprint1',
			tenant_id: 'tenant1',
			name: 'Test Blueprint',
			description: 'Test Description',
			category: 'Test Category',
			nodes: [],
			edges: [],
			forms: [],
		};

		beforeEach(() => {
			vi.clearAllMocks();
		});

		it('should successfully fetch blueprint data', async () => {
			(axios.get as any).mockResolvedValueOnce({
				status: 200,
				data: mockBlueprintData,
			});

			const result = await getBlueprint();

			expect(axios.get).toHaveBeenCalledWith('1/actions/blueprints/1/graph');
			expect(result).toEqual(mockBlueprintData);
		});

		it('should throw error when response status is not 200', async () => {
			(axios.get as any).mockResolvedValueOnce({
				status: 404,
				data: null,
			});

			await expect(getBlueprint()).rejects.toThrow('Failed to fetch blueprint');
			expect(axios.get).toHaveBeenCalledWith('1/actions/blueprints/1/graph');
		});

		it('should throw error when request fails', async () => {
			const error = new Error('Network error');
			(axios.get as any).mockRejectedValueOnce(error);

			await expect(getBlueprint()).rejects.toThrow(error);
			expect(axios.get).toHaveBeenCalledWith('1/actions/blueprints/1/graph');
		});
	});

	describe('getGlobalFormProviders', () => {
		it('should return the correct global form providers', () => {
			const providers = getGlobalFormProviders();

			expect(providers).toHaveLength(2);

			expect(providers[0]).toEqual({
				id: 'id-global-form-provider-1',
				name: 'Global Form Provider 1',
				properties: [
					{
						id: 'id-global-form-provider-1-property-1',
						name: 'Global Property 1.1',
						nodeId: 'id-global-form-provider-1',
						nodeName: 'Global Form Provider 1',
					},
					{
						id: 'id-global-form-provider-1-property-2',
						name: 'Global Property 2.1',
						nodeId: 'id-global-form-provider-1',
						nodeName: 'Global Form Provider 1',
					},
				],
			});

			expect(providers[1]).toEqual({
				id: 'id-global-form-provider-2',
				name: 'Global Form Provider 2',
				properties: [
					{
						id: 'id-global-form-provider-2-property-1',
						name: 'Global Property 1.2',
						nodeId: 'id-global-form-provider-2',
						nodeName: 'Global Form Provider 2',
					},
					{
						id: 'id-global-form-provider-2-property-2',
						name: 'Global Property 2.2',
						nodeId: 'id-global-form-provider-2',
						nodeName: 'Global Form Provider 2',
					},
				],
			});
		});
	});
});
