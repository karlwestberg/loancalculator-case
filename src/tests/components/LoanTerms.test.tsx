import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import LoanTerms from '~/components/LoanTerms';
import '@testing-library/jest-dom'

describe('LoanTerms', () => {
    it('should render default state', () => {
        render(<LoanTerms />)

        expect(screen.getByText(/calculate your personalized loan terms/i)).toBeInTheDocument()
        expect(screen.queryByText('Approved')).not.toBeInTheDocument()
        expect(screen.queryByText('Not approved')).not.toBeInTheDocument()
    })

    it('should render approved loan state', () => {
        render(<LoanTerms result={{
            "approval": {
                "status": "approved",
            },
            "loanDetails": {
                "annualInterestRate": 10.5,
                "totalPayment": 166953.75,
                "totalInterest": 16953.75
            }
        }}/>)
        
        expect(screen.getByText(/interest rate/i)).toBeInTheDocument()
        expect(screen.getByText(/total interest cost/i)).toBeInTheDocument()
        expect(screen.getByText(/total repayment amount/i)).toBeInTheDocument()
        expect(screen.getByLabelText('loan-status')).toHaveTextContent(/approved/i)
    })

    it('should render not approved loan state', () => {
        render(<LoanTerms
            result={{
                "approval": {
                    "status": "not_approved",
                    "maxLoanAmount": 30000,
                }
            }}
        />)
        
        expect(screen.getByText(/max loan amount/i)).toBeInTheDocument()
        expect(screen.getByLabelText('loan-status')).toHaveTextContent(/not approved/i)
    })
})
