import {  Menu } from '@mantine/core';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import switchLang from '~/services/language';

const Language = () => {
    let { t, i18n } = useTranslation("translation");
    const isEnglish = i18n.language === 'en';
    const isFrench = i18n.language === 'fr';
    
    return (
        <>
            <Menu trigger="click-hover" component="li" openDelay={100} closeDelay={400} position="top" arrowPosition="center" className="nav-item dropup">
                <Menu.Target>
                    <Link to="#" className="dropdown-toggle dropdown-indicator has-indicator nav-link text-base">
                        <span>
                            {isEnglish && (t('translation:english'))}
                            {isFrench && (t('translation:french'))}
                        </span>
                    </Link>
                </Menu.Target>
                <Menu.Dropdown component="ul" className="language-list">
                    <li>
                    {!isEnglish && (
                        <Menu.Item component={Link} to="#" onClick={() => switchLang("en")} className="language-item">
                            <span className="language-name">{t("english")}</span>
                        </Menu.Item>
                    )}
                    </li>
                    
                    <li>
                    {!isFrench && (
                        <Menu.Item component={Link} to="#" onClick={() => switchLang("fr")} className="language-item">
                            <span className="language-name">{t("french")}</span>
                        </Menu.Item>
                    )}
                    </li>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export default Language;