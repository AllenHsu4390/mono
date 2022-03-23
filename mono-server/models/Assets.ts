import { Asset } from "./Asset";
import { Pagination } from "./Pagination";

export interface Assets {
  assets: Asset[];
  pagination: Pagination;
}
