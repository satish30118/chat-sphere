const Button = ({ label, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`border rounded-xl bg-blue-600 text-white font-bold py-2 px-6 transition-transform duration-200 w-full ${className}`}
  >
    {label}
  </button>
);

export default Button;
