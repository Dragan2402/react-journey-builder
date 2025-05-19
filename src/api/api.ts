import { GlobalFormProvider } from '@/types/internal/blueprintNode';

import { BlueprintGraphDto } from '../types/dto/blueprint';
import axios from './axios';

export const getBlueprint = async (): Promise<BlueprintGraphDto> => {
	try {
		const response = await axios.get('1/actions/blueprints/1/graph');

		if (response.status === 200) {
			return response.data;
		}

		throw new Error('Failed to fetch blueprint');
	} catch (error) {
		console.error('Failed to fetch blueprint, error: ', error);
		throw error;
	}
};

// This is a simulation of getting global form providers from the api.
export const getGlobalFormProviders = (): GlobalFormProvider[] => {
	return [
		{
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
		},
		{
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
		},
	];
};
