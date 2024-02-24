import { TabsContent } from "@/components/ui/tabs";
import { useDictionary } from "@/contexts/DictionaryContext";
import { useGameData } from "@/contexts/GameDataContext";

function AboutTab() {
  const t = useDictionary();
  const gd = useGameData();
  return (
    <TabsContent value="about">
      <div>
        {t("header.dataVersion")}
        <b>{gd.version}</b>
      </div>
    </TabsContent>
  );
}
export default AboutTab;
