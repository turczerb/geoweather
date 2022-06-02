import Search from "./Search";
import Daily from "./Daily";
import Forecast from "./Forecast";
// ez lesz a provider component?

const Home = () => {
  return (
    <div>
      <Search />
      <Daily />
      <Forecast />
    </div>
  );
};

export default Home;
