import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AssetCard } from "./asset-card";
import { Container } from "@mui/material";
import Page from "./page";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#e8dfdc",
      dark: "#b6adaa",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000000",
    },
  },
});

export default function AssetPage() {
  return (
    <Page>
      <Container
        sx={{
          paddingY: "8px",
        }}
        maxWidth="md"
      >
        <AssetCard src={"https://source.unsplash.com/random"} />
      </Container>
    </Page>
  );
}
