const BlueButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center gap-2 w-fit"
    >
      {children}
    </button>
  );
};

export default BlueButton;
