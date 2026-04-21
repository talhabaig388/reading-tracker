function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
    />
  );
}

export default Input;