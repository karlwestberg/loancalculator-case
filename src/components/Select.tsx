
import { useId } from 'react';
import InputFieldContainer from '~/components/InputFieldContainer';
import cx from '~/utils/cx';

type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    label?: string,
}

export default function Select ({ label, className, style, ...props }:SelectProps) {
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
            />
            <span className='absolute right-2 pointer-events-none'>
                ▼
            </span>
        </InputFieldContainer>
    )
}
