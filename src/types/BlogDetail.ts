import type { Blog } from "./Blog";

export interface BlogDetail extends Blog {
  tags: string[];
  body:string;
}
