"use client";
import Image from "next/image";

interface ItemIconProps {
  type: "character" | "light_cone";
  id: string | null;
  level: number;
}

function ItemIcon({ type, id, level }: ItemIconProps) {
  if (!id || (type == "character" && id.length != 4) || (type == "light_cone" && id.length != 5)) {
    return (
      <div className="w-[100px] h-[100px] flex justify-center items-center bg-neutral-300">?</div>
    );
  }
  return (
    <div className="w-[100px] h-[100px] relative">
      <Image
        className="absolute"
        width={100}
        height={100}
        src={process.env.NEXT_PUBLIC_BASE_DATA_URL + `/icon/${type}/${id}.png`}
        alt={id}
      />
      <span className="absolute top-0 left-0 backdrop-blur-sm">Lv. {level}</span>
    </div>
  );
}

export default ItemIcon;
