import { Button } from "@mantine/core";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ValidatedForm } from "@rvf/react-router";
import Auth from "~/components/auth/layout";
import resetValidator from "~/utils/validator/resetValidator";
import type { Route } from "./+types/forgotPassword";
import { InputText } from "~/components/input";

export function meta({}: Route.MetaArgs) {
    const { t } = useTranslation();
    const title = `${t('global:fpassword')} | Data, Analysis and Security`;
    
    return [ { title: title }];
}

export default function ForgotPassword() {
    let { t } = useTranslation();
    const data = {
        "title": t("auth:fpassword.title")
    }
    
    return (
        <Auth>
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <div className="nk-block-des">
                        <p>{data.title}</p>
                    </div>
                </div>
            </div>
            
            <ValidatedForm validator={resetValidator()} method="POST">
                <div className="form-group">
                    <div className="form-control-wrap">
                        <InputText 
                            label="Email" 
                            name="email"
                            type="email"
                            placeholder={ t('placeholder:email') } 
                            withAsterisk={true} 
                        />
                    </div>
                </div>
                <div className="form-group">
                    <Button type="submit" fullWidth>{ t('btn:reset_link') }</Button>
                </div>
            </ValidatedForm>
            <div className="form-note-s2 pt-5">
                <Link className="link link-primary link-sm" to="/">
                    { t('btn:return_login') }
                </Link>
            </div>
        </Auth>
    )
}