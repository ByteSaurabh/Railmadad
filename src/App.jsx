import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./utils/auth.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
