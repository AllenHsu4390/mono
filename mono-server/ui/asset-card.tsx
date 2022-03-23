import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface Props {
  src: string;
  isFull: boolean;
}

export function AssetCard({ src, isFull }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <CardMedia
        sx={{
          objectFit: "cover",
          height: isFull ? "" : "400px",
        }}
        component="img"
        image={src}
        alt="random"
      ></CardMedia>
    </Card>
  );
}
