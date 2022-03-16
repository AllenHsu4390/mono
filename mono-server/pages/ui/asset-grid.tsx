import { Container, Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
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
  const theme = useTheme();
  return (
    <Container
      sx={{
        paddingY: "8px",
        maxWidth: ["100%", "100%", theme.breakpoints.values.md],
      }}
    >
      <Grid
        container
        spacing={{
          xs: 1,
          sm: 2,
          md: 4,
        }}
      >
        {assets.map((asset, index) => (
          <Link href="/a" key={index}>
            <Grid item key={asset.key} xs={4} sm={4} md={4}>
              <Box
                sx={{
                  cursor: "pointer",
                }}
              >
                <AssetCard {...asset} />
              </Box>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}
