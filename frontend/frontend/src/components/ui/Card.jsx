function Card({ children }) {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow p-5">
      {children}
    </div>
  );
}

export default Card;