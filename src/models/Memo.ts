import { MemoStatus } from "./MemoStatus";

export type Memo = {
  id: string;
  title: string;
  description: string;
  status: MemoStatus;
  tags: string[];
  startAt: Date | null;
  endAt: Date | null;
};
