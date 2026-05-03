import Hero from "./Hero";
import Categories from "./Categories";
import NewArrivals from "./NewArrivals";
import BestSeller from "./BestSeller";
import Countdown from "./Countdown";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrivals />
      <BestSeller />
      <Countdown />
    </main>
  );
};

export default Home;
