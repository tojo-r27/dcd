import i18n from 'i18next';
import Cookies from 'js-cookie';

const switchLang = (lng: string) => {
    const lang = lng ? lng : "en";
    i18n.changeLanguage(lang);
    Cookies.remove('locale');
    Cookies.set("locale", lng, { expires: 7, secure: true });
};

export default switchLang;