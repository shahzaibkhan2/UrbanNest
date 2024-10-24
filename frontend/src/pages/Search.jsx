import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUri } from "../constants/apiRoutes";
import { toast } from "sonner";
import sadEmoji from "../assets/sad.png";
import { BlockLoader, ListingItem } from "../components";

const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchParam: "",
    order: "desc",
    houseType: "all",
    sort: "created_at",
    parking: false,
    offer: false,
    furnished: false,
  });
  const [isLoading, setIsloading] = useState(false);
  const [houselistings, setHouseListings] = useState([]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const searchParamFromUrl = urlSearchParams.get("searchParam");
    const orderParamFromUrl = urlSearchParams.get("order");
    const houseTypeParamFromUrl = urlSearchParams.get("houseType");
    const parkingParamFromUrl = urlSearchParams.get("parking");
    const sortParamFromUrl = urlSearchParams.get("sort");
    const offerParamFromUrl = urlSearchParams.get("offer");
    const furnishedParamFromUrl = urlSearchParams.get("furnished");

    if (
      searchParamFromUrl ||
      orderParamFromUrl ||
      houseTypeParamFromUrl ||
      parkingParamFromUrl ||
      sortParamFromUrl ||
      offerParamFromUrl ||
      furnishedParamFromUrl
    ) {
      setSearchData({
        searchParam: searchParamFromUrl || "",
        order: orderParamFromUrl || "desc",
        houseType: houseTypeParamFromUrl || "all",
        parking: parkingParamFromUrl === "true" ? true : false,
        furnished: furnishedParamFromUrl === "true" ? true : false,
        sort: sortParamFromUrl || "created_at",
        offer: offerParamFromUrl === "true" ? true : false,
      });

      const fetchAllListings = async () => {
        try {
          const searchQuery = urlSearchParams.toString();
          setIsloading(true);
          const response = await axios.get(
            `${apiUri.baseUri}/${apiUri.houseListingUri}/get-allListings?${searchQuery}`
          );

          if (response.data.success) setHouseListings(response.data.data);
          else {
            toast.error("Sorry ! There is some issue with the server.");
          }
        } catch (error) {
          toast.error("Sorry ! There is some issue with the server.");
          console.log("Error fetching listings", error.message);
        } finally {
          setIsloading(false);
        }
      };
      fetchAllListings();
    }
  }, [location.search]);

  // onChange Handler
  const onChangeHandler = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sell" ||
      e.target.id === "rent"
    )
      setSearchData({ ...searchData, houseType: e.target.id });

    if (e.target.id === "searchParam")
      setSearchData({ ...searchData, searchParam: e.target.value });

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    )
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked === "true" || e.target.checked ? true : false,
      });

    if (e.target.id === "sort_ordering") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, order, sort });
    }
  };

  // onSubmit Handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams();
    if (searchData.searchParam)
      urlSearchParams.set("searchParam", searchData.searchParam);
    if (searchData.offer) urlSearchParams.set("offer", searchData.offer);
    if (searchData.furnished)
      urlSearchParams.set("furnished", searchData.furnished);
    if (searchData.sort) urlSearchParams.set("sort", searchData.sort);
    if (searchData.order) urlSearchParams.set("order", searchData.order);
    if (searchData.parking) urlSearchParams.set("parking", searchData.parking);
    if (searchData.houseType)
      urlSearchParams.set("houseType", searchData.houseType);

    const searchQuery = urlSearchParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <main className="flex mt-20 pt-10 px-[6%] gap-4">
      <section className="flex flex-col p-5 border-r-[0.5px] border-gray-300">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-10">
          <div>
            <label
              htmlFor="search"
              className="block mb-2 font-semibold text-gray-800 text-lg"
            >
              Search Here
            </label>
            <input
              onChange={onChangeHandler}
              value={searchData.searchParam}
              type="text"
              id="searchParam"
              className="border p-2 w-full outline-none rounded-lg bg-yellow-100"
              placeholder="Enter search here"
            />
          </div>

          <div>
            <p className="mb-2 font-semibold text-gray-800 text-lg">
              House Type
            </p>
            <div className="flex flex-wrap gap-5 items-center">
              <label className="inline-flex items-center space-x-2">
                <input
                  onChange={onChangeHandler}
                  checked={searchData.houseType === "rent"}
                  id="rent"
                  type="checkbox"
                  className="size-5"
                />
                <span className="text-gray-700">Rent</span>
              </label>

              <label className="inline-flex items-center space-x-2">
                <input
                  onChange={onChangeHandler}
                  checked={searchData.houseType === "sell"}
                  type="checkbox"
                  id="sell"
                  className="size-5"
                />
                <span className="text-gray-700">Sell</span>
              </label>

              <label className="inline-flex items-center space-x-2">
                <input
                  onChange={onChangeHandler}
                  checked={searchData.houseType === "all"}
                  type="checkbox"
                  id="all"
                  className="size-5"
                />
                <span className="text-gray-700">All</span>
              </label>

              <label className="inline-flex items-center space-x-2">
                <input
                  onChange={onChangeHandler}
                  checked={searchData.offer}
                  type="checkbox"
                  id="offer"
                  className="size-5"
                />
                <span className="text-gray-700">Offer</span>
              </label>
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold text-gray-800 text-lg">Features</p>
            <label className="inline-flex items-center space-x-2 mr-4">
              <input
                onChange={onChangeHandler}
                checked={searchData.parking}
                type="checkbox"
                id="parking"
                className="size-5"
              />
              <span className="text-gray-700">Parking</span>
            </label>

            <label className="inline-flex items-center space-x-2">
              <input
                onChange={onChangeHandler}
                checked={searchData.furnished}
                type="checkbox"
                id="furnished"
                className="size-5"
              />
              <span className="text-gray-700">Furnished</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="sort"
              className="block mb-2 font-semibold text-gray-800 text-lg"
            >
              Sort By
            </label>
            <select
              onChange={onChangeHandler}
              defaultValue={"created_at_desc"}
              id="sort_ordering"
              className="border p-2 w-full focus:outline-none outline-none rounded-lg text-gray-700"
            >
              <option value="normalPrice_desc">Price: High to Low</option>
              <option value="normalPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-950 transition duration-200 text-white p-2 rounded-full"
          >
            Search
          </button>
        </form>
      </section>
      <section className="p-7 flex flex-col gap-32">
        <h1 className="text-3xl font-bold text-gray-800">
          House Listing Results
        </h1>
        {!isLoading && houselistings.length === 0 && (
          <div className="text-lg font-semibold text-gray-800 p-8 -mt-28 flex items-center gap-3">
            <p>Sorry ! No house listing found.</p>
            <img
              src={sadEmoji}
              alt="house-picture"
              className="size-10 rounded-full object-cover"
            />
          </div>
        )}
        {isLoading && <BlockLoader />}
        {!isLoading &&
          houselistings &&
          houselistings?.map((listing) => (
            <ListingItem key={listing?._id} listing={listing} />
          ))}
      </section>
    </main>
  );
};

export default Search;
