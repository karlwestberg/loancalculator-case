import type { CSSProperties } from "react";
import Input from "./Input";
import Select from "./Select";

interface LoanCalculatorProps {
    className?: string,
    style?: CSSProperties
}

export default function LoanCalculator(props:LoanCalculatorProps) {
    return (
        <form {...props}>
            <fieldset>
                <Select />
                <Input />
            </fieldset>
            <fieldset>
                <Input />
                <Input />
            </fieldset>
        </form>
    )
}