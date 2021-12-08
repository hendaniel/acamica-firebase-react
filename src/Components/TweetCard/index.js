import { useEffect, useState } from "react";
import { firestore, getCurrentUser, storage } from "./../../firebase";

export function TweetCard({ tweet }) {
  const user = getCurrentUser();
  const { id, likesCount, userId } = tweet;

  const [liked, setLiked] = useState(false);

  const [file, setFile] = useState();

  const [url, setUrl] = useState();
  const checkLike = async () => {
    const doc = await firestore.doc(`likes/${user?.uid}-${tweet.id}`).get();
    const isLiked = doc.data();

    if (!!isLiked) {
      setLiked(true);
    }
  };

  useEffect(() => {
    checkLike();
  });

  // Borra el documento en Firebase por su id
  const handleDelete = () => {
    firestore.doc(`tweets/${id}`).delete();
    // firestore.collection("tweets").doc(id).delete();
    firestore
      .collection("likes")
      .where("tweetId", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSendFile = () => {
    if (!file) return;
    const storageRef = storage.ref().child(file.name);
    const uploadRef = storageRef.put(file);

    uploadRef.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.bytesTransferred, snapshot.totalBytes);
      },
      (error) => {
        console.error(error);
      },
      () => {
        uploadRef.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setUrl(downloadUrl);
          console.log(downloadUrl);
        });
      }
    );
  };
  return (
    <div key={tweet.id} className="tweet__card">
      <p>{tweet.description}</p>
      <h4>{tweet.title}</h4>
      {userId === user?.uid ? (
        <button onClick={handleDelete}>Borrar</button>
      ) : (
        <></>
      )}

      {user?.uid ? (
        <button onClick={handleLike}>
          {liked ? "No me gusta" : "Me gusta"}
        </button>
      ) : (
        <></>
      )}
      <span>{tweet.likesCount}</span>

      <input type="file" onChange={handleFileChange}></input>
      {file ? (
        <button onClick={handleSendFile}>Enviar a firebase</button>
      ) : (
        <></>
      )}
      {url ? (
        <a href={url} download>
          Descargar archivo
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}
