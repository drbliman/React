import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Header from "./component/header/header";
import Main from "./component/main/mainDiv";
import NotFound from "./component/main/notFound";
import Details from "./component/main/details";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          index
          element={<Navigate to="/main/people/skywalker/page/1" replace />}
        />
        <Route
          path="/main/:root/:search/page/:idPage"
          element={<RootWrapper />}
        >
          <Route path="details/:idDetails" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </>
);

const RootWrapper = () => {
  const { root } = useParams<{ root: string }>();
  const allowedValues = [
    "people",
    "planets",
    "films",
    "species",
    "vehicles",
    "starships",
  ];

  if (allowedValues.includes(String(root))) {
    return <Main />;
  } else {
    return <NotFound />;
  }
};

export default App;
