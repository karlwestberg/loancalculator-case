import { afterEach, vi } from 'vitest'
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import useApiQuery from '~/hooks/useApiQuery';
import useCalculateLoan from '~/hooks/useCalculateLoan';
import LoanCalculator from '~/components/LoanCalculator';
import '@testing-library/jest-dom';

vi.mock('~/hooks/useApiQuery')
vi.mock('~/hooks/useCalculateLoan')

describe('LoanCalculator', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    it('should render loading state', () => {
        vi.mocked(useApiQuery).mockReturnValue({
            isPending: true,
        } as ReturnType<typeof useApiQuery>)

        render(<LoanCalculator />)

        // TODO
        expect(screen.getByLabelText('loading-state')).toBeInTheDocument()
    })

    it('should render error state', () => {
        vi.mocked(useApiQuery).mockReturnValue({
            error: new Error('test'),
        } as ReturnType<typeof useApiQuery>)

        render(<LoanCalculator />)

        // TODO
        expect(screen.getByLabelText('error-state')).toBeInTheDocument()
    })

    it('should render, fill and submit form', async () => {
        const user = userEvent.setup()

        vi.mocked(useApiQuery).mockReturnValue({
            data: {
                data: [{
                    name: 'Restaurant',
                    id: 'restaurant'
                }]
            }
        } as ReturnType<typeof useApiQuery>)
        
        const mutate = vi.fn()

        vi.mocked(useCalculateLoan).mockReturnValue({
            mutate,
            data: { data: {} }
        } as unknown as ReturnType<typeof useCalculateLoan>)

        render(<LoanCalculator />)

        await user.selectOptions(screen.getByLabelText(/industry/i), 'restaurant')
        await user.type(screen.getByLabelText(/monthly revenue/i), '50000')
        await user.type(screen.getByLabelText(/loan amount/i), '150000')
        await user.type(screen.getByLabelText(/repayment duration/i), '24')
        await user.click(screen.getByRole('button'))
        
        expect(mutate).toHaveBeenCalledWith({
            industryId: 'restaurant',
            monthlyRevenue: 50000,
            loanAmount: 150000,
            loanTermMonths: 24
        })
    })
})