import { ListingCarousel } from "../components";
import { IoLocationSharp } from "react-icons/io5";
import { FaCar, FaBed, FaBath } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import PopoverComponent from "../components/Temp";

const SingleListing = () => {
  return (
    <main className="mt-[5.02rem]">
      <ListingCarousel />
      <article className="my-20 mx-4 lg:mx-24 flex flex-col gap-3 uppercase tracking-wide text-blue-950">
        <h2 className="text-3xl font-semibold">
          The lake side cottage - $900 / month
        </h2>
        <ul className="flex flex-wrap md:flex-nowrap gap-10 my-3 text-sm text-nowrap">
          <li className="flex items-center gap-">
            <GiSofa size={22} /> <p>Furnished</p>
          </li>
          <li className="flex items-center gap-2">
            <FaCar size={22} /> <p>Parking</p>
          </li>
          <li className="flex items-center gap-2">
            <FaBed size={25} />{" "}
            <p>
              <span className="text-green-700">5</span> Beds
            </p>
          </li>
          <li className="flex items-center gap-2">
            <FaBath size={21} />{" "}
            <p>
              <span className="text-green-700">2</span> Bathrooms
            </p>
          </li>
        </ul>
        <p className="flex gap-2 items-center text-sm mt-3 text-green-700">
          <IoLocationSharp size={22} /> Malibo Point , California, USA
        </p>
        <div className="flex items-center text-blue-950 font-semibold mt-6">
          <p className="px-8 py-4 bg-yellow-300 border-r-2 border-white">
            For Sale
          </p>
          <p className="px-8 py-4 bg-yellow-300">100$ Discount</p>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <h3 className="text-lg font-bold">Description</h3>{" "}
          <p className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A porro
            consequuntur soluta. Dolor, dolorum vero reprehenderit minima rerum
            laborum dicta rem incidunt beatae asperiores deserunt ab, esse
            reiciendis officiis suscipit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Molestias maxime ipsum corrupti maiores magnam
            esse debitis unde voluptatum, labore deserunt? Numquam nobis
            corrupti rerum autem voluptates eveniet quasi, at in. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dignissimos mollitia
            nostrum sit distinctio ut sapiente dolorem recusandae error placeat
            qui doloribus autem, blanditiis architecto minus reprehenderit,
            quidem, laudantium pariatur ad.
          </p>
        </div>
        <div className="flex justify-between my-10">
          <div>
            <h4 className="font-bold text-md">Owner</h4>
            <p className="text-sm text-gray-500">Shahzaib Khan</p>
          </div>
          <button className="py-3 px-7 bg-blue-900 text-white hover:bg-blue-950 transition duration-300">
            Owner Details
          </button>
        </div>
      </article>
    </main>
  );
};

export default SingleListing;
