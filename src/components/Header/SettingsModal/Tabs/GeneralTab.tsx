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
  return (
    <TabsContent value="general">
      <div className="flex items-center space-x-2">
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
    </TabsContent>
  );
}
export default GeneralTab;
