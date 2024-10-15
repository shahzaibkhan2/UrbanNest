const BlueButton = ({ children, type, isSubmitting }) => {
  return (
    <button
      disabled={isSubmitting}
      type={type}
      className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-4 border-b-4 border-blue-800 hover:border-blue-700 rounded flex items-center justify-center gap-2 w-full text-lg mb-5"
    >
      {children}
    </button>
  );
};

export default BlueButton;
