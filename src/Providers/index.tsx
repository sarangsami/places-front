import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "services/themes";
import { ReactChildrenType } from "types";

import Layout from "Layout";

const queryClient = new QueryClient();

const Providers = (props: ReactChildrenType) => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>{children}</Layout>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Providers;
