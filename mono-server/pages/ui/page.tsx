import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "./navigation";
import CompanyContact from "./company-contact";
import { Container } from "@mui/material";

const custom = {
  palette: {
    primary: {
      light: "#fffffb",
      main: "#dcedc8",
      dark: "#aabb97",
      contrastText: "#000000",
    },
    secondary: {
      light: "#f8fdff",
      main: "#c5cae9",
      dark: "#9499b7",
      contrastText: "#000000",
    },
  },
};

const theme = createTheme({
  palette: {
    secondary: {
      light: "#fff",
      main: "#f5f5f5",
      dark: "#c2c2c2",
      contrastText: "#000000",
    },
  },
});

interface Props {
  hasFooter?: boolean;
}

const Page: React.FC<Props> = ({ hasFooter, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>
        <Container
          sx={{
            paddingY: "8px",
          }}
          maxWidth="md"
        >
          {children}
        </Container>
      </main>
      {hasFooter ? <CompanyContact /> : null}
    </ThemeProvider>
  );
};

export default Page;
