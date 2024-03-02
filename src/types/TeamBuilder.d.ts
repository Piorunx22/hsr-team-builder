export interface ITeam {
  id: string;
  name: string;
  team: ISlot[];
}

// export type ISlotTuple = readonly [ISlot, ISlot, ISlot, ISlot];

export interface ISlot {
  character: {
    id: string | null;
    level: number;
  };
  light_cone: {
    id: string | null;
    level: number;
  };
}
