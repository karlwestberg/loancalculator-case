type FieldsetHTMLProps = React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>
type FieldsetProps = FieldsetHTMLProps & {
    legend?: string
}

export default function Fieldset({ className, style, children, ...props }:FieldsetProps) {
    return (
        <fieldset className={className} style={style} {...props}>
            <legend className='font-bold text-lg'>{props.legend}</legend>
            { children }
        </fieldset>
    )
}