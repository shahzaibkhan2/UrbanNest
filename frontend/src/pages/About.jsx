import { useSelector } from "react-redux";

const About = () => {
  const { listingData } = useSelector((state) => state.listing);
  console.log(listingData);
  return <div>hello</div>;
};

export default About;
