import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { QueryScope } from '@/types/internal/queryScope';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseQueryScopes = (inputString?: string | null): QueryScope[] => {
	if (!inputString) {
		return [];
	}

	const entries = inputString.split(',');

	return entries.map((entry) => QueryScope[entry as keyof typeof QueryScope]).filter((scope) => scope !== undefined);
};
