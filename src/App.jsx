import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Country from "./Component/Country";
import DirectUser from "./Component/DirectUser";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<DirectUser />} />
          <Route path="/:code3" element={<Country />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
