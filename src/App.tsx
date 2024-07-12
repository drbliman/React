import { Routes, Route, useParams } from "react-router-dom";
import Header from "./component/header/header";
import Main from "./component/main/mainDiv";
import NotFound from "./component/main/notFound";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={ <Header /> }>
        <Route path="/main/:root" element={ <RootWrapper /> }></Route>
      </Route>
    </Routes>
  </>
);

const RootWrapper = () => {
  const { root } = useParams<{ root: string}>();
  const allowedValues = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

  if (allowedValues.includes(String(root))) {
    return <Main />;
  } else {
    return <NotFound />;
  }
};

export default App;
