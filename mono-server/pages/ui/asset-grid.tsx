import { Container, Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Assets } from "../models/Assets";
import { AssetCard } from "./asset-card";

export function AssetGrid() {
  const theme = useTheme();
  const { data, status } = useQuery<Assets, Error>("assets", async () => {
    const res = await fetch(`/api/assets`);
    return res.json();
  });

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
        {status === "loading"
          ? "Loading..."
          : status === "error" || !data
          ? "Error"
          : data.assets.map((asset, index) => (
              <Link href={`/assets/${asset.id}`} key={index}>
                <Grid item key={asset.id} xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <AssetCard {...asset} isFull={false} />
                  </Box>
                </Grid>
              </Link>
            ))}
      </Grid>
    </Container>
  );
}
