
import { useId } from 'react';
import InputFieldContainer from '~/components/InputFieldContainer';
import cx from '~/utils/cx';

type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    label?: string,
    placeholder?: string
}

export default function Select ({ label, placeholder, className, style, children, ...props }:SelectProps) {
    const internalId = useId();

    return (
        <InputFieldContainer
            className={cx(className, 'cursor-pointer relative')}
            inputFieldId={internalId}
            label={label}
            style={style}
        >
            <select
                id={internalId}
                className='block outline-0 flex-1 p-2 cursor-pointer appearance-none [&:has(option[value=""]:checked)]:text-current/50'
                {...props}
            >
                { placeholder && (
                    <>
                        <option value='' disabled>{placeholder}</option>
                        <hr />
                    </>
                )}
                { children }
            </select>
            <span className='absolute right-2 pointer-events-none'>
                ▼
            </span>
        </InputFieldContainer>
    )
}
