import { createCursor } from '.';

describe('pagination', () => {
  describe('createCursor', () => {
    it('should not return next if next is greater than total pages', () => {
      expect(createCursor(5, 5, 24)).toEqual({ total: 24, prev: '4' });
    });

    it('should not return prev if prev is first page', () => {
      expect(createCursor(1, 5, 25)).toEqual({ total: 25, next: '2' });
    });

    it('should return just total if total is 0', () => {
      expect(createCursor(1, 4, 0)).toEqual({ total: 0 });
    });
  });
});
