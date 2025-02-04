import { Link, useNavigation, type ActionFunctionArgs, type LoaderFunction } from 'react-router';
import { Button } from '@mantine/core';
import { IconAt, IconKey } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import loginValidator from '~/utils/validator/loginValidator';
import TablerIcon from '~/components/TablerIcon';
import Title from '~/components/auth/title';
import Auth from '~/components/auth/layout';
import { ValidatedForm } from '@rvf/react-router';
import { InputPassword, InputText } from '~/components/input';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
    const { t } = useTranslation();
    const title = `${t('global:login')} | Data, Analysis and Security`;
    
    return [ { title: title }];
}

export default function Login() {
    const { t } = useTranslation();
    const data = {
        "title": t("auth:login.title")
    }
    const navigation = useNavigation();
    
    return (
        <Auth>
            <Title title={data.title} />
            <ValidatedForm validator={loginValidator()} method="POST" action='#' className="mt-10">
                <div className="form-group">
                    <InputText 
                        label={ t('label:email') }
                        name='email'
                        type='email'
                        icon={<TablerIcon IconComponent={IconAt} />}
                        placeholder={ t('placeholder:email') }
                    />
                </div>
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="password">{ t('label:password') }</label>
                        <Link className="link link-primary link-sm" to="/forgot-password">
                            { t('label:fpassword') }
                        </Link>
                    </div>
                    <div className="form-control-wrap">
                        <InputPassword
                            name='password'
                            icon={<TablerIcon IconComponent={IconKey} />} 
                            placeholder={ t('placeholder:password') }
                        />
                    </div>
                </div>
                <div className="form-group">
                    <Button type="submit" fullWidth>
                        { navigation.state === "submitting" ? "Loading..." : t('btn:signin') }
                    </Button>
                </div>
            </ValidatedForm>
            <div className="text-center mt-5">
                <span className="fw-500">
                    { t("link:not_account") } 
                    <Link to="/register">
                        { t('btn:signup') }
                    </Link>
                </span>
            </div>
        </Auth>
    )
}