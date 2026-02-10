import type { CSSProperties } from "react"
import type { components } from "~/types/api"
import addNumberSpacing from "~/utils/addNumberSpacing"
import cx from "~/utils/cx"

type LoanTermsProps = {
    className?: string,
    style?: CSSProperties,
    result?: null | components['schemas']['LoanCalculateResponse']
}

export default function LoanTerms(props:LoanTermsProps) {
    const isApproved = props.result?.approval?.status === 'approved'
    const isNotApproved = props.result?.approval?.status === 'not_approved'
    const isIdle = !isApproved && !isNotApproved

    const dataItem = (text:string, value:number|undefined, unit:string) => {
        if (value === undefined) return null
        return (
            <div>{`${text}: `}<strong>{addNumberSpacing(Math.round(value))}{` ${unit}`}</strong></div>
        )
    }

    return (
        <div 
            className={cx(
                props.className,
                'p-2 rounded-md text-black',
                'bg-gray-50', {
                    'bg-green-300': isApproved,
                    'bg-red-400': isNotApproved
                }
            )}
            style={props.style}
        >
            <div className='flex justify-between mb-2'>
                <h2 className='font-bold'>Loan terms</h2>
                { isIdle ? null : (
                    <div className='bg-white px-1.5 rounded-sm flex items-center text-xs' aria-label='loan-status'>
                        { isApproved ? 'Approved' : 'Not approved'}
                    </div>
                ) }
            </div>
            <div className='min-h-25'>
                {
                    isIdle ? (
                        <div>Calculate your personalized loan terms</div>
                    ) : isApproved ? (
                        <>
                            { dataItem('Interest rate', props.result?.loanDetails?.annualInterestRate, '%')}
                            { dataItem('Total interest cost', props.result?.loanDetails?.totalInterest, 'kr')}
                            { dataItem('Total repayment amount', props.result?.loanDetails?.totalPayment, 'kr')}
                        </>
                    ) : (
                        <>
                            <div>Max loan amount: <strong>{props.result?.approval?.maxLoanAmount} kr</strong></div>
                        </>
                    )
                }
            </div>
        </div>
    )
}