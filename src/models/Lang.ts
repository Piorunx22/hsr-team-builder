import { Locale } from "@/i18n-config";

export default class Lang {
  public locale: Locale;

  public get fetchPath(): string {
    switch (this.locale) {
      case "chs":
        return "cn";
      case "cht":
        return "cht";
      default:
        return this.locale;
    }
  }

  public get htmlLang(): string {
    switch (this.locale) {
      case "chs":
        return "zh_Hans";
      case "cht":
        return "zh_Hant";
      case "de":
        return "de_DE";
      case "en":
        return "en_US";
      case "es":
        return "es_ES";
      case "fr":
        return "fr_FR";
      case "id":
        return "id_ID";
      case "jp":
        return "ja_JP";
      case "kr":
        return "ko_KR";
      case "pt":
        return "pt_BR";
      case "ru":
        return "ru_RU";
      case "th":
        return "th_TH";
      case "vi":
        return "vi_VN";
    }
  }

  constructor(locale: Locale) {
    this.locale = locale;
  }
}
