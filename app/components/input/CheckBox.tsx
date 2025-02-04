import { Checkbox } from "@mantine/core";
import { useField } from "@rvf/react-router";

export const CheckBox = ({
    label,
    name,
    icon,
    placeholder,
    withAsterisk,
}: {
    label?: any;
    name: string;
    icon?: any;
    placeholder?: string;
    withAsterisk?: any;
}) => {
    // const field = useField(name);
    const { getInputProps, error } = useField(name);

    return (
        <>
            <Checkbox 
                label={label}
                name={name}
                {...(icon && { leftSection: icon })}
                {...(placeholder && { placeholder: placeholder })}
                { ...getInputProps({ id: name }) }
                withAsterisk={withAsterisk}
                error={error()}
            />
        </>
    );
}