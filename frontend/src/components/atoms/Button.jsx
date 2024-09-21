const Button = ({ label, onClick, className,bg }) => (
  <button
    type="button"
    onClick={onClick}
    className={`border border-gray-300 rounded-xl bg-${bg} text-white font-bold py-2 px-6 transition-transform duration-200 w-full ${className}`}
  >
    {label}
  </button>
);

export default Button;
