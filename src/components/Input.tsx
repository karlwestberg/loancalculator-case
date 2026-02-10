import { useId, type DetailedHTMLProps, type InputHTMLAttributes } from "react"
import InputFieldContainer from "~/components/InputFieldContainer"

type InputHTMLProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputProps = InputHTMLProps & {
    label?: string
    unitLabel?: string,
}

export default function Input({ className, style, unitLabel, label, ...props }:InputProps) {
    const internalId = useId()
    const unitLabelId = `${internalId}-unit`

    return (
        <InputFieldContainer
            inputFieldId={internalId}
            label={label}
            className={className}
            style={style}
        >
            <input
                id={internalId}
                className='flex-1 outline-0 p-2'
                aria-describedby={unitLabelId}
                {...props}
            />
            { unitLabel && (
                <div className='pr-2 self-stretch flex items-center cursor-text absolute right-0 h-full pointer-events-none'>
                    <span id={unitLabelId} className='select-none'>
                        { unitLabel }
                    </span>
                </div>
            ) }
        </InputFieldContainer>
    )
}
