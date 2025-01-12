export type Action = {
  label: string;
  execute: () => void;
  type: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

export type PageInfo = {
  last_page: number;
  per_page: number;
  total: number;
  current_page: number;
};

export type OnChangeParams = { page: number; paginate: number };

export type TablePaginatorProps = Partial<PageInfo> & {
  onChange: ({ page, paginate }: OnChangeParams) => void;
};
