
import { useId } from 'react';
import InputFieldContainer from '~/components/InputFieldContainer';
import cx from '~/utils/cx';
import ChevronDown from './icons/ChevronDown';

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
            <div className='absolute right-1 h-10/12 aspect-square pointer-events-none bg-current/10 flex items-center justify-center rounded-sm'>
                <ChevronDown className='h-4 w-4' />
            </div>
        </InputFieldContainer>
    )
}
