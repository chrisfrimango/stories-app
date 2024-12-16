export type FilterType = "all" | "my-posts" | "other-posts";

export interface PostFilterProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
}

export interface PostListProps {
  filter?: FilterType;
}

// Existing post types can stay here...
export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: string;
  username: string;
  category_id: number;
  category_name: string;
  created_at: string;
}
