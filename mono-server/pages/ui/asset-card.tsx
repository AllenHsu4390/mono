import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

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
        boxShadow: "none",
      }}
    >
      <CardMedia component="img" image={src} alt="random"></CardMedia>
    </Card>
  );
}
