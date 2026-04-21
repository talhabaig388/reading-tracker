function Button({ children, onClick, type = "primary" }) {
  const base = "px-4 py-2 rounded-lg font-medium transition";

  const styles = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90",
    secondary: "bg-gray-200 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;