import { describe, it, expect } from 'vitest';
import { getPasteData } from '../clipboard-util';

describe('clipboard-util', () => {
	describe('getPasteData', () => {
		it('should return the clipboard data', () => {
			const event = {
				clipboardData: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					getData: (type: string) => {
						return 'data';
					}
				}
			};
			expect(getPasteData(event as unknown as ClipboardEvent)).toBe('data');
		});

		it('should return empty string if clipboardData is null', () => {
			const event = {
				clipboardData: null
			};
			expect(getPasteData(event as unknown as ClipboardEvent)).toBe('');
		});
	});
});
