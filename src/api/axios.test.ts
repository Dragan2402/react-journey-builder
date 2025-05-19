import { describe, it, expect } from 'vitest';

import axiosInstance from './axios';

describe('Axios Configuration', () => {
	it('should create axios instance with correct base URL', () => {
		expect(axiosInstance.defaults.baseURL).toBe('http://localhost:3000/api/v1/');
	});
});
