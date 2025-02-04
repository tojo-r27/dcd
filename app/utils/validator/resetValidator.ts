import { withZod } from "@rvf/zod";
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const resetValidator = () => {
    const { t } = useTranslation();
    
    const schema = withZod(
        z.object({
            email: z.string({
                required_error: t('validation:required'),
                invalid_type_error: t('validation:type.email')
            }).email(t('validation:type.email'))
        })
    );
    
    return schema;
};

export default resetValidator;