import { useTranslation } from 'react-i18next';
import Title from '~/components/auth/title';
import { Link, useNavigate, type LoaderFunction } from 'react-router';
import { useState } from 'react';
import { Button, Group, Radio } from '@mantine/core';
import parseHTML from '~/services/parseHTML';
import { Urls } from '~/services/urls';
import Auth from '~/components/auth/layout';
import { ValidatedForm } from '@rvf/react-router';
import { requireNoUserSession } from '~/services/session.server';
import type { Route } from './+types/register';
import { InputText, InputPassword, CheckBox } from '~/components/input';
import registrationValidator from '~/utils/validator/registrationValidator';

export function meta({}: Route.MetaArgs) {
    const { t } = useTranslation();
    const title = `${t('global:register_user')} | Data, Analysis and Security`;
    
    return [ { title: title }];
}

export const loader: LoaderFunction = requireNoUserSession;

export default function Register() {
    let { t } = useTranslation();
    const data = {
        "title": t("auth:register.title_user")
    }
    const [userType, setUserType] = useState('individual');
    const navigate = useNavigate();
    
    //choice user type
    const handleUserTypeChange = (param) => {
        // Update the component state
        setUserType(param);
    
        if (param === "company") {
            return navigate(Urls.auth.registerCompany);
        }
    }
    
    return (
        <Auth>
            <Title title={data.title} />
            <ValidatedForm validator={registrationValidator()} method="POST">
                <div className="form-group">
                    <label className="form-label">{ t('label:choice.are_you') }</label>
                    <br/>
                    <Group>
                        <Radio label={ t('label:choice.individual') } name="userType" value="individual" checked={userType === 'individual'} onChange={() => handleUserTypeChange("individual")} />
                        <Radio label={ t('label:choice.company') } name="userType" value="company" checked={userType === 'company'} onChange={() => handleUserTypeChange("company")} />
                    </Group>
                </div>
                <div className="form-group">
                    <InputText 
                        label="Email" 
                        name="email"
                        type='text'
                        placeholder={ t('placeholder:email') } 
                        withAsterisk={true} 
                    />
                </div>
                <div className="form-group">
                    <div className="form-control-wrap">
                        <InputPassword
                            label={ t('label:password') } 
                            name='password'
                            placeholder={ t('placeholder:password') }
                            withAsterisk={true}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-control-wrap">
                        <InputPassword
                            label={ t('label:rpassword') } 
                            name='rpassword'
                            placeholder={ t('placeholder:rpassword') }
                            withAsterisk={true}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <CheckBox
                        label={ parseHTML(t('link:link_tos')) }
                        name="terms"
                        withAsterisk={true}
                    />
                </div>
                <div className="form-group">
                    <Button type="submit" fullWidth>{ t("btn:signup") }</Button>
                </div>
            </ValidatedForm>
            <div className="form-note-s2 pt-4">
                { t('link:have_account') }
                <Link to="/">
                    { t('btn:signin') }
                </Link>
            </div>
        </Auth>
    )
}