import "./App.css";
import { useEffect, useState } from "react";
import { firestore } from "./firebase";

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
  });

  useEffect(() => {
    firestore
      .collection("tweets")
      .get()
      .then((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, autor } = doc.data();
          return {
            tweet: tweet,
            autor: autor,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enviarTweet = firestore.collection("tweets").add(tweet);

    const collRef = await enviarTweet;

    const docRef = await collRef.get();

    const result = docRef.data();

    setTweets([result, ...tweets]);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newTweet = {
      ...tweet,
      [name]: value,
    };
    setTweet(newTweet);
  };
  return (
    <div className="App">
      <form>
        <textarea onChange={handleChange} name="tweet"></textarea>
        <input onChange={handleChange} name="autor"></input>
        <button onClick={handleSubmit}>Enviar Tweet</button>
      </form>
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <h1>{tweet.tweet}</h1>
            <h4>por: {tweet.autor}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default App;
