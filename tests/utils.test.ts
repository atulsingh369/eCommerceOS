import { cn, formatPrice } from '@/lib/utils'

describe('utils', () => {
    describe('cn', () => {
        it('merges class names correctly', () => {
            expect(cn('c1', 'c2')).toBe('c1 c2')
        })
    })

    describe('formatPrice', () => {
        it('formats number to currency string', () => {
            const price = 1000
            const formatted = formatPrice(price)
            expect(formatted).toContain('INR')
            expect(formatted).toContain('1,000.00')
        })

        it('handles undefined input gracefully', () => {
            expect(formatPrice(undefined)).toContain('0.00');
        });

        it('handles null input gracefully', () => {
            expect(formatPrice(null)).toContain('0.00');
        });

        it('handles NaN gracefully', () => {
            expect(formatPrice(NaN)).toContain('0.00');
        });
    })
})
