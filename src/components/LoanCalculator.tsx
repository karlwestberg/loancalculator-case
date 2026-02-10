import type { CSSProperties } from "react";
import type { components } from "~/types/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import useApiQuery from "~/hooks/useApiQuery";
import useCalculateLoan from "~/hooks/useCalculateLoan";
import Input from "./Input";
import Select from "./Select";
import Fieldset from "./Fieldset";
import LoanTerms from "./LoanTerms";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface LoanCalculatorProps {
    className?: string,
    style?: CSSProperties
}

export default function LoanCalculator(props:LoanCalculatorProps) {
    const { data: industries, isPending, error } = useApiQuery('/api/industries', ['industries'])
    const { formState: { errors: formErrors }, ...form } = useForm<components['schemas']['LoanCalculateRequest']>()
    const calculateLoan = useCalculateLoan()

    const onSubmit: SubmitHandler<components['schemas']['LoanCalculateRequest']> = data => calculateLoan.mutate(data)
    const onInputNumChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = e => {
        const val = e.target.value.replace(/\D/g, '')
        const numberVal = +val
        e.target.value = val === '' ? '' : `${numberVal}`
    }

    if (isPending) return <LoadingState />
    if (error || !industries.data?.length) return <ErrorState />

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
            <LoanTerms
                result={calculateLoan.data?.data}
            />
            <Fieldset legend='Company information'>
                <Select
                    label='Industry'
                    placeholder='Select industry'
                    defaultValue=''
                    aria-invalid={formErrors.industryId ? 'true' : 'false'}
                    {...form.register('industryId', {
                        required: true,
                        validate: val => industries.data?.map(item => item.id).includes(val)
                    })}
                >
                    { industries.data.map(item => {
                        if (!item.id) return null

                        return (
                            <option value={item.id} key={item.id}>
                                { item.name || item.id }
                            </option>
                        )
                    })}
                </Select>
                <Input
                    label='Monthly revenue'
                    inputMode='numeric'
                    placeholder='123 456'
                    unitLabel='kr'
                    aria-invalid={formErrors.monthlyRevenue ? 'true' : 'false'}
                    {...form.register('monthlyRevenue', {
                        required: true,
                        valueAsNumber: true,
                        validate: v => v > 0,
                        onChange: onInputNumChange
                    })}
                />
            </Fieldset>
            <Fieldset legend='Loan request'>
                <Input
                    label='Loan amount'
                    inputMode='numeric'
                    placeholder='123 456'
                    unitLabel='kr'
                    aria-invalid={formErrors.loanAmount ? 'true' : 'false'}
                    {...form.register('loanAmount', {
                        required: true,
                        valueAsNumber: true,
                        validate: v => v > 0,
                        onChange: onInputNumChange
                    })}
                />
                <Input
                    label='Repayment duration'
                    inputMode='numeric'
                    placeholder='6'
                    unitLabel='months'
                    aria-invalid={formErrors.loanTermMonths ? 'true' : 'false'}
                    {...form.register('loanTermMonths', {
                        required: true,
                        valueAsNumber: true,
                        validate: v => v > 3 && 49 > v,
                        onChange: onInputNumChange
                    })}
                />
            </Fieldset>
            <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors'
                disabled={calculateLoan.isPending}
            >
                Calculate loan
            </button>
        </form>
    )
}