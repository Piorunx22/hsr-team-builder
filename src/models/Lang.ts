import { Locale } from "@/i18n-config";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter, Noto_Sans_JP, Noto_Sans_KR, Noto_Sans_SC, Noto_Sans_TC } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const notoJP = Noto_Sans_JP({ weight: "400", subsets: ["latin"] });
const notoSC = Noto_Sans_SC({ weight: "400", subsets: ["latin"] });
const notoTC = Noto_Sans_TC({ weight: "400", subsets: ["latin"] });
const notoKR = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

export default class Lang {
  public locale: Locale;

  public get font(): NextFont {
    switch (this.locale) {
      case "chs":
        return notoSC;
      case "cht":
        return notoTC;
      case "jp":
        return notoJP;
      case "kr":
        return notoKR;
      default:
        return inter;
    }
  }

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
