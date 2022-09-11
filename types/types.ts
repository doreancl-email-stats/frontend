export type LinkType = {
  _id?: string;
  title: string;
  link: string;
  long_url: string;
  is_active: boolean;
  createdAt: string;
};

export type StatType = {
  _id: string;
  link: string;
  count: number;
  time: string;
};
