import { TabsContent } from "@/components/ui/tabs";
import { useDictionary } from "@/contexts/DictionaryContext";
import { useGameData } from "@/contexts/GameDataContext";

function AboutTab() {
  const t = useDictionary();
  const gd = useGameData();
  return (
    <TabsContent value="about">
      <div className="flex justify-between font-medium text-neutral-500">
        <div>
          {t("settings.about.appVersion")}
          <b>{process.env.APP_VERSION}</b>
        </div>
        <div>
          {t("settings.about.dataVersion")}
          <b>{gd.version}</b>
        </div>
      </div>
    </TabsContent>
  );
}
export default AboutTab;
