import { BaseUserT } from "./user.interface";

export type InterestT<T = number> = {
  id: number;
  sent_to: T;
  sent_by: T;
  is_accepted: boolean;
  created_at: Date;
};
export type MyInterestT = {
  id: number;
  user: BaseUserT;
  is_accepted: boolean;
  created_at: Date;
};
