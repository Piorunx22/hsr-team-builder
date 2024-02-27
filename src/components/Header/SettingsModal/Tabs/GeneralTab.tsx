import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { useDictionary } from "@/contexts/DictionaryContext";
import { Label } from "@radix-ui/react-label";
import { useTheme } from "next-themes";

function GeneralTab() {
  const { theme, setTheme } = useTheme();
  const t = useDictionary();
  const locale = window.location.pathname.slice(1);
  const setLanguage = (lang: string) => {
    window.location.pathname = `${lang}`;
  };

  return (
    <TabsContent value="general">
      <div className="flex justify-around">
        <div className="">
          <Label htmlFor="select-theme">Theme</Label>
          <Select
            defaultValue={theme}
            onValueChange={(e) => setTheme(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t(`settings.general.theme.${theme}`)} />
            </SelectTrigger>
            <SelectContent id="select-theme">
              <SelectItem value="light">{t("settings.general.theme.light")}</SelectItem>
              <SelectItem value="dark">{t("settings.general.theme.dark")}</SelectItem>
              <SelectItem value="system">{t("settings.general.theme.system")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Label htmlFor="select-language">Language</Label>
          <Select
            defaultValue={locale}
            onValueChange={(e) => setLanguage(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={locale} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                lang="zh_Hans"
                value="chs"
              >
                简体中文
              </SelectItem>
              <SelectItem
                lang="zh_Hant"
                value="cht"
              >
                繁體中文
              </SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">español</SelectItem>
              <SelectItem value="fr">français</SelectItem>
              <SelectItem value="id">Bahasa Indonesia</SelectItem>
              <SelectItem
                lang="ja_JP"
                value="jp"
              >
                日本語
              </SelectItem>
              <SelectItem value="kr">한국어</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="th">ไทย</SelectItem>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </TabsContent>
  );
}
export default GeneralTab;
