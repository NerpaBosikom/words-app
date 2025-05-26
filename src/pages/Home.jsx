import WordList from "../components/WordList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import words from "../data/words";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <WordList words={words} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
