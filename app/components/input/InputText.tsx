import { TextInput } from "@mantine/core";
import { useField } from "@rvf/react-router";

export const InputText = ({
    label,
    name,
    type,
    icon,
    placeholder,
    withAsterisk,
}: {
    label?: string;
    name: string;
    type: string;
    icon?: any;
    placeholder?: string;
    withAsterisk?: boolean;
}) => {
    const { getInputProps, error } =    useField(name);

    return (
        <>
            <TextInput 
                label={label} 
                type={type}
                id={name}
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