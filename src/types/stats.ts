export interface PlayerStat {
  name: string;
  team: string;
  value: number;
  unit: string;
  statType: string;
}

export interface GameStats {
  passing?: PlayerStat[];
  rushing?: PlayerStat[];
  receiving?: PlayerStat[];
} 