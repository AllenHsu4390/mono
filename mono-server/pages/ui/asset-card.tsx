import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface Props {
  src: string;
}

export function AssetCard({ src }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
      }}
    >
      <CardMedia component="img" image={src} alt="random" />
    </Card>
  );
}
