import { Container, Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { Assets } from "../models/Assets";
import { AssetCard } from "./asset-card";
import InfiniteScroll from "react-infinite-scroller";
import { Error } from "../models/Error";

const fetchAssets = async ({ pageParam = 1 }) => {
  const response = await fetch(`/api/assets`);
  return response.json();
};

export function AssetGrid() {
  const theme = useTheme();
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Assets, Error>("assets", fetchAssets, {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage.pagination.next);
        if (typeof lastPage.pagination.next === "undefined") return undefined;
        if (typeof lastPage.pagination.total === "undefined") return undefined;
        if (lastPage.pagination.next) return lastPage.pagination.next;
        return undefined;
      },
    });

  return (
    <Container
      sx={{
        paddingY: "8px",
        maxWidth: ["100%", "100%", theme.breakpoints.values.md],
      }}
    >
      <InfiniteScroll hasMore={hasNextPage} loadMore={(_) => fetchNextPage()}>
        <Grid
          container
          spacing={{
            xs: 1,
            sm: 2,
            md: 4,
          }}
        >
          {isLoading
            ? "Loading..."
            : isError || !data
            ? "Error"
            : data.pages.map((page) =>
                page.assets.map((asset) => (
                  <Link href={`/assets/${asset.id}`} key={asset.id}>
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
                ))
              )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
