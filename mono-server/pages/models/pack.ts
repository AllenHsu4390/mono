/*
 Data model for NFT pack
*/

import { Blob } from "buffer";

export interface User {
  userId: string;
}

export interface NFT {
  userId: string;
  ratePct: number;
  data: Blob;
  commissionPct: number;
}

export interface Asset {
  userId: string;
  ratePct: number;
  data: Blob;
}

export interface Pack {
  userId: string;
  assets: Asset[];
}

export interface Trophy {
  userId: string;
  asset: Asset;
}
