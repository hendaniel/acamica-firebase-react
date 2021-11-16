import { useEffect, useState } from "react";
import { firestore, getCurrentUser } from "./../../firebase";

export function TweetCard({ tweet }) {
  const user = getCurrentUser();
  const { id, likesCount } = tweet;

  const [liked, setLiked] = useState(false);

  const checkLike = async () => {
    const doc = await firestore.doc(`likes/${user.uid}-${tweet.id}`).get();
    const isLiked = doc.data();

    if (!!isLiked) {
      setLiked(true);
    }
  };

  // Borra el documento en Firebase por su id
  const handleDelete = () => {
    firestore.doc(`tweets/${id}`).delete();
    // firestore.collection("tweets").doc(id).delete();
  };

  // Actualiza el documento de relacion de likes
  const handleLike = async () => {
    firestore
      .doc(`tweets/${id}`)
      .update({ likesCount: liked ? likesCount - 1 : likesCount + 1 });

    const docRef = `likes/${user.uid}-${id}`;
    if (liked) {
      firestore.doc(docRef).delete();
      setLiked(false);
    } else {
      firestore.doc(docRef).set({ userId: user.uid, tweetId: id });
      setLiked(true);
    }
  };

  useEffect(() => {
    checkLike();
  });

  return (
    <div key={tweet.id} className="tweet__card">
      <p>{tweet.description}</p>
      <h4>{tweet.title}</h4>
      <button onClick={handleDelete}>Borrar</button>

      <button onClick={handleLike}>{liked ? "No me gusta" : "Me gusta"}</button>
      <span>{tweet.likesCount}</span>
    </div>
  );
}
