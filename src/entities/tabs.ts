export enum ModuleType {
    board,
    file,
    drawing,
    none,
}

export interface Tab {
    label: string;
    type: ModuleType;
}
