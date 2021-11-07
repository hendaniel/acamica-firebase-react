export function TweetCard({ tweet, handleDelete, handleLike }) {
  return (
    <div key={tweet.id} className="tweet__card">
      <p>{tweet.tweet}</p>
      <h4>por: {tweet.autor}</h4>
      <button onClick={() => handleDelete(tweet.id)}>Borrar</button>

      <button onClick={() => handleLike(tweet.id, tweet.likes, tweet.isLiked)}>
        {tweet?.isLiked ? "No me gusta" : "Me gusta"}
      </button>
      <span>{tweet.likes}</span>
    </div>
  );
}
