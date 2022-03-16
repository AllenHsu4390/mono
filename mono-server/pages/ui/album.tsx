import { CreatorProfile } from "./creator-profile";
import { AssetGrid } from "./asset-grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "./navigation";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const creator = {
  desc: "Hi, I'm a creator. I make cool things. Check out my work!",
};

const assets = Array(10)
  .fill(1)
  .map((_, index) => {
    return index + 1;
  })
  .map((i) => {
    return {
      key: `${i}`,
      src: "https://source.unsplash.com/random",
    };
  });

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>
        {/* Hero unit */}
        <CreatorProfile creator={creator} />
        <AssetGrid assets={assets} />
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
