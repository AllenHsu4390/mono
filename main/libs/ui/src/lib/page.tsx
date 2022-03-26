import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "./navigation";
import CompanyContact from "./company-contact";
import { Container } from "@mui/material";

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

const user = {
  avatarUrl: "https://source.unsplash.com/random/300×300",
};

interface Props {
  hasFooter?: boolean;
}

const Page: React.FC<Props> = ({ hasFooter, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation user={user} />
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
