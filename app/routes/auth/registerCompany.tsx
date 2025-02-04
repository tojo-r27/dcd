import { useTranslation } from 'react-i18next';
import Title from '~/components/auth/title';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Button, Group, Radio, TextInput } from '@mantine/core';
import parseHTML from '~/services/parseHTML';
import { Urls } from '~/services/urls';
import registrationCompanyValidator from '~/utils/validator/registrationCompanyValidator';
import Auth from '~/components/auth/layout';
import { ValidatedForm } from '@rvf/react-router';
import type { Route } from './+types/register';
import { CheckBox, InputPassword, InputText } from '~/components/input';

export function meta({}: Route.MetaArgs) {
    const { t } = useTranslation();
    const title = `${t('global:register_company')} | Data, Analysis and Security`;
    
    return [ { title: title }];
}

export default function RegisterCompany() {
    let { t } = useTranslation();
    const data = {
        "title": t("auth:register.title_company")
    }
    const [userType, setUserType] = useState('company');
    const navigate = useNavigate();
    
    //choice user type
    const handleUserTypeChange = (param) => {
        // Update the component state
        setUserType(param);
        
        if (param === "individual") {
            return navigate(Urls.auth.register);
        }
    };
    
    return (
        <Auth>
            <Title title={data.title} />
            <ValidatedForm validator={registrationCompanyValidator()} method="POST">
                <div className="form-group">
                    <label className="form-label">{ t('label:choice.are_you') }</label>
                    <br/>
                    <Group>
                        <Radio label={ t('label:choice.individual') } name="userType" value="individual" checked={userType === 'individual'} onChange={() => handleUserTypeChange("individual")} />
                        <Radio label={ t('label:choice.company') } name="userType" value="company" checked={userType === 'company'} onChange={() => handleUserTypeChange("company")} />
                    </Group>
                </div>
                <div className="form-group" id="company_field">
                    <InputText
                        label={ t('label:company.name') }
                        name="name"
                        type='text'
                        placeholder="Ex: Acme" 
                        withAsterisk={true}
                    />
                </div>
                <div className="form-group">
                    <InputText
                        label='Email'
                        name="email"
                        type='email'
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