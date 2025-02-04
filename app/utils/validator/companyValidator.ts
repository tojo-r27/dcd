import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const companyValidator = () => {
    const { t } = useTranslation();
    
    const schema = z.object({
        name: z.string({ required_error: t('validation:required') }).min(4, { message: t('validation:min', { numb: 4 }) }),
        email: z.string({
            required_error: t('validation:required'),
            invalid_type_error: t('validation:type.email')
        }).email(t('validation:type.email')),
        year_founded: z.string({ required_error: t('validation:required') }),
        size: z.string({ required_error: t('validation:required') }),
        sector: z.string({ required_error: t('validation:required') }),
        type: z.string({ required_error: t('validation:required') }),
        password: z.string({ required_error: t('validation:required') }),
    });
    
    return schema;
};

export default companyValidator;