const BlueButton = ({ children, type }) => {
  return (
    <button
      type={type}
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center justify-center gap-2 w-full text-lg"
    >
      {children}
    </button>
  );
};

export default BlueButton;
