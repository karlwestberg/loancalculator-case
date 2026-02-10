import type { CSSProperties } from "react";
import Input from "./Input";
import Select from "./Select";
import useApiQuery from "~/hooks/useApiQuery";
import Fieldset from "./Fieldset";

interface LoanCalculatorProps {
    className?: string,
    style?: CSSProperties
}

export default function LoanCalculator(props:LoanCalculatorProps) {
    const { data:industries, isPending, error } = useApiQuery('/api/industries', ['industries'])

    if (isPending) return <>Loading...</>
    if (error || !industries.data?.length) return <>Error...</>
    return (
        <form {...props}>
            <Fieldset legend='Company information'>
                <Select label='Industry' placeholder='Select industry'>
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
                />
            </Fieldset>
            <Fieldset legend='Loan request'>
                <Input
                    label='Loan amount'
                />
                <Input
                    label='Repayment duration'
                />
            </Fieldset>
        </form>
    )
}