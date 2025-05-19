import { BlueprintGraph } from '../types/dto/blueprint';
import axios from './axios';

export const getBlueprint = async (): Promise<BlueprintGraph> => {
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
