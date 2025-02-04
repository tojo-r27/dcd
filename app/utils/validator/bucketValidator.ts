import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const bucketValidator = () => {
    const { t } = useTranslation();
    
    const schema = z.object({
        name: z.string({ required_error: t('validation:required') }).min(4, { message: t('validation:min', { numb: 4 }) }),
        datacenter: z.string({ required_error: t('validation:required') })
    });
    
    return schema;
};

export default bucketValidator;