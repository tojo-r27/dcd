import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { withZod } from "@rvf/zod";

const registrationValidator = () => {
    const { t } = useTranslation();
    
    const schema = withZod(
        z.object({
            email: z.string({
                required_error: t('validation:required'),
                invalid_type_error: t('validation:type.email')
            }).email(t('validation:type.email')),
            password: z.string({ required_error: t('validation:required') }).min(8, { message: t('validation:min', { numb: 8 }) }),
            rpassword: z.string({ required_error: t('validation:required') }).min(8, { message: t('validation:min', { numb: 8 }) }),
            terms: z.string({ required_error: t('validation:required') }),
        }).refine(data => {
            return data.password == data.rpassword;
        }, {
            message: t('validation:equalto'),
            path: ['rpassword']
        })
    );
    
    return schema;
};

export default registrationValidator;