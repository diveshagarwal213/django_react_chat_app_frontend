export type InterestT<T = number> = {
  id: number;
  sent_to: T;
  sent_by: T;
  is_accepted: boolean;
  created_at: Date;
};
