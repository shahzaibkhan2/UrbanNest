import { IoLocationSharp } from "react-icons/io5";
import { FaCar, FaBed, FaBath } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";

const ListingItem = ({ listing }) => {
  return (
    <article className="flex flex-col w-[330px] rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      <div className="w-full rounded-t-lg overflow-hidden">
        <img
          src={listing?.houseImages[0]}
          alt="house-image"
          className="rounded-t-xl size-full object-cover overflow-hidden hover:scale-105 transition duration-300"
        />
      </div>

      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-800 line-clamp-1 my-3">
          {listing?.title}
        </h1>
        <ul className="flex items-center gap-6 text-gray-800">
          <li className="flex items-center gap-2">
            <GiSofa size={22} />
          </li>
          <li className="flex items-center gap-2">
            <FaCar size={22} />
          </li>
          <li className="flex items-center gap-2">
            <FaBed size={25} />
            <span>{listing?.bedrooms}</span>
          </li>
          <li className="flex items-center gap-2">
            <FaBath className="size-5 mb-1" />
            <span className="mt-1">{listing?.bathrooms}</span>
          </li>
        </ul>
        <p className="line-clamp-3 text-gray-800 my-3">
          {listing?.description}
        </p>

        <div className="flex items-center gap-2 text-gray-700">
          <IoLocationSharp className="text-green-700 size-5" />
          <p>{listing?.address}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 my-4">
            <p className="text-blue-950 text-4xl font-bold">
              ${listing?.normalPrice}
            </p>
            <span className="ml-2 line-through text-green-800">
              ${listing?.discountPrice}
            </span>
          </div>
          <div className="size-12 bg-blue-950 rounded-full flex items-center justify-center animate-pulse">
            <p className="text-white capitalize">{listing?.houseType}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ListingItem;
