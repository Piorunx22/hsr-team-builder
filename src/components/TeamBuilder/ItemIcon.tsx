"use client";
import { useDictionary } from "@/contexts/DictionaryContext";
import { useGameData } from "@/contexts/GameDataContext";
import Image from "next/image";

interface ItemIconProps {
  type: "character" | "light_cone";
  id: string | null | undefined;
  level?: number;
  size?: number;
}

function ItemIcon({ type, id, level, size = 100 }: ItemIconProps) {
  const t = useDictionary();
  const gameData = useGameData();
  let item;

  if (id && ((type == "character" && id.length == 4) || (type == "light_cone" && id.length == 5))) {
    item = gameData[`${type}s`][id];
  }

  if (!id || !item) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center bg-neutral-300`}
      >
        ?
      </div>
    );
  }

  const rarity = item.rarity;

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rarity-${rarity}`}
    >
      <Image
        className="absolute"
        width={size}
        height={size}
        src={process.env.NEXT_PUBLIC_BASE_DATA_URL + "/" + item.icon}
        alt={id}
      />
      {level ? (
        <span className="absolute left-0 top-0 backdrop-blur-sm">
          {t("common.level.short", { LEVEL: String(level) })}
        </span>
      ) : null}
    </div>
  );
}

export default ItemIcon;
