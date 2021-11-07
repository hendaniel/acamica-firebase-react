import { useEffect, useState } from "react";
import { TweetCard } from "../../Components/TweetCard";
import { firestore } from "./../../firebase";

function Tweets() {
  // Estado local para los tweets que hay en firebase
  const [tweets, setTweets] = useState([]);

  // Estructura del tweet que estamos creando
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    likes: 0,
  });

  useEffect(() => {
    const cerrarConexion = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map(
          (doc) => {
            const { tweet, autor, likes, isLiked } = doc.data();
            // Transformamos la data según queramos en nuestra app
            return {
              tweet,
              autor,
              isLiked: isLiked ?? false,
              likes: likes ?? 0,
              id: doc.id,
            };
          },
          () => {
            console.error("Sucedio un error");
          }
        );
        setTweets(tweets);
      });
    return () => {
      // Limpiamos el listener que creamos cuando se desmonta el componente
      cerrarConexion();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enviarTweet = firestore.collection("tweets").add(tweet);

    const collRef = await enviarTweet;

    const docRef = await collRef.get();

    const result = docRef.data();

    setTweets([result, ...tweets]);
  };

  /**
   * Actualiza el estado local del tweet que estamos creando
   * @param {*} e
   */
  const handleChange = (e) => {
    const { value, name } = e.target;
    const newTweet = {
      ...tweet,
      [name]: value,
    };
    setTweet(newTweet);
  };

  const handleDelete = (id) => {
    firestore.doc(`tweets/${id}`).delete();
    // firestore.collection("tweets").doc(id).delete();
  };

  /**
   *
   * @param {string} id
   * @param {number} likes
   * @param {boolean} isLiked
   */
  const handleLike = (id, likes, isLiked) => {
    firestore.doc(`tweets/${id}`).update({
      isLiked: !isLiked,
      likes: isLiked ? likes - 1 : likes + 1,
    });
  };

  return (
    <div className="tweets__container">
      <form className="form-container">
        <textarea
          onChange={handleChange}
          name="tweet"
          placeholder="Tweet"
        ></textarea>
        <input onChange={handleChange} name="autor" placeholder="Autor"></input>
        <button onClick={handleSubmit}>Enviar Tweet</button>
      </form>
      <div className="tweets__list">
        {tweets.map((tweet) => {
          return (
            <TweetCard
              tweet={tweet}
              handleDelete={handleDelete}
              handleLike={handleLike}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Tweets;
