import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/LAyout";
import HomePage from "./pages/HomePage";
import ExplorerPage from "./pages/ExplorerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;