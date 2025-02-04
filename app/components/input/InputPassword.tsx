import { PasswordInput } from "@mantine/core";
import { useField } from "@rvf/react-router";

export const InputPassword = ({
    label,
    name,
    icon,
    placeholder,
    withAsterisk,
}: {
    label?: string;
    name: string;
    icon?: any;
    placeholder?: string;
    withAsterisk?: boolean;
}) => {
    // const field = useField(name);
    const { getInputProps, error } = useField(name);

    return (
        <>
            <PasswordInput 
                label={label}
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