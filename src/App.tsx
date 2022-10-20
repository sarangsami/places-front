import { Routes, Route } from "react-router-dom";

import Authentication from "pages/Authentication";
import Home from "pages/Home";
import Places from "pages/Places";
import NewPlace from "pages/NewPlace";
import UpdatePlace from "pages/UpdatePlace";
import NotFound from "pages/NotFound";
import ProtectedLayout from "Layout/ProtectedLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/:uid/places" element={<Places />} />
      <Route>
        <Route
          path="/places/new"
          element={
            <ProtectedLayout>
              <NewPlace />
            </ProtectedLayout>
          }
        />
      </Route>
      <Route>
        <Route
          path="/places/:pid"
          element={
            <ProtectedLayout>
              <UpdatePlace />
            </ProtectedLayout>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
