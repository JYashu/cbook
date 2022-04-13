export type CellTypes = 'code' | 'md';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}