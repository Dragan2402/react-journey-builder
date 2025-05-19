import { describe, it, expect } from 'vitest';

import { cn } from './utils';

describe('cn utility function', () => {
	it('should merge multiple class names', () => {
		expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500');
	});

	it('should deduplicate Tailwind classes', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
	});
});
