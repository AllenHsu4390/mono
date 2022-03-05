import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { Asset } from "../models/pack";

const getUser = (userId: string) => {
  return {
    name: userId + "default",
  };
};

export const AssetCard = ({ userId, ratePct }: Asset) => {
  const user = getUser(userId);

  return (
    <div>
      <h1>Rate: ${ratePct}</h1>
      <span>{user.name}</span>
    </div>
  );
};
