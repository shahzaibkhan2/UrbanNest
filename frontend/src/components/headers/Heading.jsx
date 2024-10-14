const Heading = ({ children }) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl text-blue-950 font-bold my-8">{children}</h1>
    </header>
  );
};

export default Heading;
