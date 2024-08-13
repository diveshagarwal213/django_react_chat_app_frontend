export type DefaultPaginationType<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

export type OptionsT = { label: string; value: unknown };

export interface SaveProfileI {
  refresh_token: string;
  text: string;
}
