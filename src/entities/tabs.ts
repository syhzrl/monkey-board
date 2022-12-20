export enum ModuleType {
  board,
  file,
  drawing,
  none,
}

export interface Tab {
  id: string;
  label: string;
  type: ModuleType;
}
