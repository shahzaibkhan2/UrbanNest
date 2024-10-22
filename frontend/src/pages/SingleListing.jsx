import { ListingCarousel } from "../components";
import { IoLocationSharp } from "react-icons/io5";
import { FaCar, FaBed, FaBath } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUri } from "../constants/apiRoutes";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const SingleListing = () => {
  const [listing, setListing] = useState(null);
  const [showOwner, setShowOwner] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const messageRef = useRef();

  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await axios.get(
          `${apiUri.baseUri}/${apiUri.houseListingUri}/get-listing/670e3784740e2b1f76ed68ad`
        );
        if (res.data.success) {
          setListing(res.data.data);
        } else {
          toast.error("Sorry ! Internal server error.");
        }
      } catch (error) {
        toast.error("Sorry ! Internal server error", error);
      }
    };
    getListing();
  }, []);

  return (
    <main className="mt-[5.02rem]">
      <ListingCarousel />
      <section className="flex flex-col lg:flex-row justify-between my-20 mx-6 lg:mx-28">
        <article className="flex flex-col gap-3 tracking-wide text-blue-950">
          <h2 className="text-3xl font-semibold capitalize">
            {listing?.title ? listing.title : "A perfect house"}
          </h2>
          <ul className="flex flex-wrap md:flex-nowrap gap-10 my-3 text-sm text-nowrap">
            <li className="flex items-center gap-2">
              <GiSofa size={22} />
              <p>{listing?.furnished ? "Furnished" : "Not Furnished"}</p>
            </li>
            <li className="flex items-center gap-2">
              <FaCar size={22} />
              <p>{listing?.parking ? "Parking" : "No Parking"}</p>
            </li>
            <li className="flex items-center gap-2">
              <FaBed size={25} />
              <p>
                <span className="text-green-700 mr-1">
                  {listing?.beds ? listing.beds : 1}
                </span>
                {listing?.beds > 1 ? "Beds" : "Bed"}
              </p>
            </li>
            <li className="flex items-center gap-2">
              <FaBath size={21} />
              <p>
                <span className="text-green-700 mr-1">
                  {listing?.bathrooms ? listing.bathrooms : 1}
                </span>
                {listing?.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
              </p>
            </li>
          </ul>
          <p className="flex gap-2 items-center text-sm mt-3 text-green-700 capitalize">
            <IoLocationSharp size={22} /> {listing?.address && listing.address}
          </p>
          <div className="flex items-center text-blue-950 font-semibold gap-2 mt-6">
            <p className="px-8 py-4 yellow-glassmorphism border-r-2 capitalize">
              For {listing?.houseType && listing.houseType}
            </p>
            <p className="px-8 py-4 yellow-glassmorphism">
              ${listing?.discountPrice ? listing.discountPrice : 0}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="text-sm">
              {listing?.description
                ? listing.description
                : "This house is a beautiful house."}
            </p>
          </div>
          <div className="flex flex-col gap-1 my-10">
            <h4 className="font-bold text-md">Owner</h4>
            <p className="text-sm text-gray-500 capitalize">
              {listing?.owner?.username ? listing.owner.username : "Owner"}
            </p>
          </div>
        </article>
        {user.user && showOwner ? (
          <form className="flex flex-col gap-3 w-[300px] xss:w-[400px] sm:w-[500px] border border-gray-300 p-8 yellow-glassmorphism">
            <label
              htmlFor="message"
              className="capitalize text-lg text-blue-950"
            >
              Send a message to {listing?.owner?.username} (Owner)
            </label>
            <textarea
              rows="6"
              id="message"
              required
              placeholder="Enter message..."
              className="resize-none p-2 bg-yellow-100 rounded-lg outline-none border-none"
            />
            <Link
              to={`mailto:${listing?.email}?subject=Regarding ${listing?.owner?.username}&body=${messageRef?.current?.value}`}
              className="text-center py-3 px-7 bg-blue-900 text-white hover:bg-blue-950 rounded-full transition duration-300"
            >
              Send Message
            </Link>
            <button
              onClick={() => setShowOwner(false)}
              className="py-3 px-7 bg-red-900 text-white hover:bg-red-950 rounded-full transition duration-300"
            >
              Cancel Message
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowOwner(true)}
            className="size-fit group py-3 px-7 bg-blue-900 text-white hover:bg-blue-950 rounded-full transition duration-300"
          >
            Contact Owner
          </button>
        )}
      </section>
    </main>
  );
};

export default SingleListing;
