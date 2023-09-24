import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Country from "./Component/Wrapper";
import DirectUser from "./Component/DirectUser";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  const [country, setCountry] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<DirectUser setCountry={setCountry} />} />
          <Route
            path="/:code3"
            element={<Country country={country} setCountry={setCountry} />}
          >
            <Route
              path="airports"
              element={<Country country={country} setCountry={setCountry} />}
            />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
