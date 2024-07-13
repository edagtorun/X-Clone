import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Protected from "./pages/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/*  Kullacinin, erisim icin hesabina giris yapmasi zorunlu olan route'lari bir kapsayici route icerisine aldik */}
        <Route element={<Protected />}>
          <Route path="/home" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
