import { useEffect, useState } from "react";
import { TweetCard } from "../../Components/TweetCard";
import { SessionBar } from "../../Components/SessionBar";

import { firestore, auth, isLogged } from "./../../firebase";

const initialTweetState = {
  title: "",
  description: "",
  likesCount: null,
  userId: null,
};

function Tweets() {
  // Estado local para los tweets que hay en firebase
  const [tweets, setTweets] = useState([]);

  // Estructura del tweet que creamos para enviar a Firebase
  const [tweet, setTweet] = useState(initialTweetState);

  // Crea la conexión para escuchar cambios en el documento de Firebase
  const tweetsListener = () =>
    firestore.collection("tweets").onSnapshot(
      (snapshot) => {
        const tweets = snapshot.docs.map(
          (doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          },
          () => {
            console.error("Sucedio un error");
          }
        );
        setTweets(tweets);
      },
      (error) => {
        console.error(error);
      }
    );

  // Crea la conexión para escuchar cambios en el usuario autenticado de Firebase
  const sessionListener = () =>
    auth.onAuthStateChanged((user) => {
      setTweet((tweet) => ({ ...tweet, userId: user?.uid }));

      // Nos aseguramos de guardar el doc con la referencia del usuario
      firestore
        .collection("users")
        .doc(user.uid)
        .set({ name: user.displayName, email: user.email });
    });

  // Envia el tweet local a Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      firestore.collection("tweets").add(tweet);
    } catch (error) {
      console.error(error);
    }
  };

  // Actualiza el estado local del tweet que vamos a enviar a Firebase
  const handleChange = (e) => {
    const { value, name } = e.target;
    const newTweet = {
      ...tweet,
      [name]: value,
    };
    setTweet(newTweet);
  };

  useEffect(() => {
    const unsuscribeTweets = tweetsListener();
    const unsuscribeSession = sessionListener();
    return () => {
      // Limpiamos los listeners que creamos cuando se desmonta el componente
      unsuscribeTweets();
      unsuscribeSession();
    };
  }, []);

  return (
    <>
      <SessionBar />
      <div className="tweets__container">
        <form className="form-container">
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
          ></input>
          <textarea
            onChange={handleChange}
            name="description"
            placeholder="Tweet"
          ></textarea>
          <button onClick={handleSubmit} disabled={!isLogged()}>
            Enviar Tweet
          </button>
        </form>
        <div className="tweets__list">
          {tweets.map((tweet) => {
            return <TweetCard key={tweet.id} tweet={tweet} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Tweets;
