import type { CSSProperties, ReactNode } from "react"
import cx from "~/utils/cx"

interface InputFieldContainerProps {
    className?: string
    style?: CSSProperties
    label?: string
    inputFieldId?: string
    children?: ReactNode
}

export default function InputFieldContainer(props:InputFieldContainerProps) {
    return (
        <div
            className={cx('my-2 mb-4', props.className)}
            style={props.style}
        >
            { props.label && (
                <label htmlFor={props.inputFieldId}>
                    { props.label }
                </label>
            ) }
            <div className='border transition-colors border-current/15 focus-within:border-current rounded-sm mt-1 flex items-center group relative'>
                { props.children }
            </div>
        </div>
    )
}
