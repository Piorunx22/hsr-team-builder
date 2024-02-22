export interface ITeam {
  name: string;
  team: ISlot[];
}

// export type ISlotTuple = readonly [ISlot, ISlot, ISlot, ISlot];

export interface ISlot {
  character: {
    id: string;
    level: number;
  };
  light_cone: {
    id: string;
    level: number;
  };
}
