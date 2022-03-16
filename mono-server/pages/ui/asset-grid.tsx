import { Container, Grid } from "@mui/material";
import React from "react";
import { AssetCard } from "./asset-card";

interface Asset {
  key: string;
  src: string;
}

interface Props {
  assets: Asset[];
}

export function AssetGrid({ assets }: Props) {
  return (
    <Container
      sx={{
        py: 8,
      }}
      maxWidth="md"
    >
      {/* End hero unit */}
      <Grid container spacing={4}>
        {assets.map((asset) => (
          <Grid item key={asset.key} xs={12} sm={6} md={4}>
            <AssetCard src={asset.src} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
