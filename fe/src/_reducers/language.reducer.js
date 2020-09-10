import lang from '../languages';

export function language(state = {}, action) {
  switch (action.type) {
    case 'ENGLISH':
      localStorage.setItem("sltLanguage", 'ENGLISH')
      return { lang: 'ENGLISH', siteConstants: lang.ENGLISH };

    case 'HINDI':
      localStorage.setItem("sltLanguage", 'HINDI')
      return { lang: 'HINDI', siteConstants: lang.HINDI };

    default:

      let sltLanguage = localStorage.getItem("sltLanguage");
      if (sltLanguage) {
        return { lang: sltLanguage, siteConstants: lang[sltLanguage] };
      } else {
        return { lang: 'ENGLISH', siteConstants: lang.ENGLISH };
      }

  }
}
