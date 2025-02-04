import Language from "../dropdown/Language";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    let { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    
    return (
        <>
            <div className="nk-block nk-auth-footer">
              <div className="nk-block-between">
                  <ul className="nav nav-sm h6">
                      <li className="nav-item">
                        <a className="link link-primary fw-normal py-1 px-3" href="#" target="_blank">{t('link:tos')}</a>
                      </li>
                      <li className="nav-item">
                        <a className="link link-primary fw-normal py-1 px-3" href="#" target="_blank">{t('link:privacy_policy')}</a>
                      </li>
                      <li className="nav-item dropup">
                          <Language />
                      </li>
                  </ul>
              </div>
              <div className="mt-3">
                  <p>&copy; { `2020 - ${currentYear}` } All Rights Reserved.</p>
              </div>
            </div>
        </>
    )
}

export default Footer;