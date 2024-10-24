const ListingItem = ({ listing }) => {
  return (
    <div className="flex items-center justify-center text-white bg-blue-400">
      <div className="flex max-w-2xl rounded-xl border-black bg-white ">
        <div className="w-1/2 h-full">
          <img
            src={listing?.houseImages[0]}
            alt="house-image"
            className="rounded-l-xl size-full object-cover"
          />
        </div>

        <div className="w-1/2 space-y-4 rounded-xl bg-white text-black">
          <div className=" space-y-4 ml-7 mt-14">
            <p className="uppercase">for {listing?.houseType}</p>
            <h1 className="text-4xl font-bold">{listing?.title}</h1>
            <p className=" space-y-4">{listing?.description}</p>

            <div className="flex items-center  ">
              <p className=" text-green-700 text-4xl font-bold">
                {listing?.normalPrice}
              </p>
              <span className="ml-8 line-through">
                {listing?.discountPrice}
              </span>
            </div>
          </div>

          <div className=" items-center text-center  justify-center">
            <button className="text-white font-bold bg-green-800 py-4 px-20 rounded-xl">
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
