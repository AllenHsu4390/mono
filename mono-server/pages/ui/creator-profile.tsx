import { Box, Container } from "@mui/material";
import React from "react";
import { CreatorDescription } from "./creator-description";

interface Creator {
  desc: string;
}

interface Props {
  creator: Creator;
}

export function CreatorProfile({ creator }: Props) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <CreatorDescription desc={creator.desc} />
      </Container>
    </Box>
  );
}
