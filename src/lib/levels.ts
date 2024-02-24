export const MIN_LEVEL = 1;
export const MAX_LEVEL = 80;
export const MIN_LEVEL_RELIC = 0;
export const MAX_LEVEL_RELIC = 15;

export const validateLevel = (level: number) => {
  return level > MAX_LEVEL ? MAX_LEVEL : level < MIN_LEVEL ? 0 : level;
};
