"use client";
import { useDictionary } from "@/contexts/DictionaryContext";
import { useGameData } from "@/contexts/GameDataContext";
import Image from "next/image";

interface ItemIconProps {
  type: "character" | "light_cone";
  id: string | null;
  level?: number;
}

function ItemIcon({ type, id, level }: ItemIconProps) {
  const t = useDictionary();
  const gameData = useGameData();
  let item;

  if (id && ((type == "character" && id.length == 4) || (type == "light_cone" && id.length == 5))) {
    item = gameData[`${type}s`][id];
  }

  if (!id || !item) {
    return (
      <div className="w-[100px] h-[100px] flex justify-center items-center bg-neutral-300">?</div>
    );
  }

  const rarity = item.rarity;

  return (
    <div className={`w-[100px] h-[100px] relative rarity-${rarity}`}>
      <Image
        className="absolute"
        width={100}
        height={100}
        src={process.env.NEXT_PUBLIC_BASE_DATA_URL + "/" + item.icon}
        alt={id}
      />
      {level ? (
        <span className="absolute top-0 left-0 backdrop-blur-sm">
          {t("common.level.short", { LEVEL: String(level) })}
        </span>
      ) : null}
    </div>
  );
}

export default ItemIcon;
