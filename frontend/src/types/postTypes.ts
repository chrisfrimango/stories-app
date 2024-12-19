export type FilterType = "all" | "my-posts" | "other-posts";

export interface PostFilterProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
}

export interface PostListProps {
  filter?: FilterType;
}

export type { Post } from "./api";
