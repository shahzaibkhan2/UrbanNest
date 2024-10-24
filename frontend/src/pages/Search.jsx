const Search = () => {
  return (
    <main className="flex mt-20 pt-10 px-[6%] gap-4">
      <section className="flex flex-col p-5 border-r-[0.5px] border-gray-300">
        <form className="flex flex-col gap-10">
          <div>
            <label
              htmlFor="search"
              className="block mb-2 font-semibold text-gray-800 text-lg"
            >
              Search Here
            </label>
            <input
              type="text"
              id="search"
              name="search"
              className="border p-2 w-full outline-none rounded-lg bg-yellow-100"
              placeholder="Enter search here"
            />
          </div>

          <div>
            <p className="mb-2 font-semibold text-gray-800 text-lg">
              House Types
            </p>
            <div className="flex flex-wrap gap-5 items-center">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="types"
                  value="rent"
                  className="size-5"
                />
                <span className="text-gray-700">Rent</span>
              </label>

              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="types"
                  value="sale"
                  className="size-5"
                />
                <span className="text-gray-700">Sale</span>
              </label>

              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="types"
                  value="rentSale"
                  className="size-5"
                />
                <span className="text-gray-700">Rent & Sale</span>
              </label>

              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="types"
                  value="offer"
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
                type="checkbox"
                name="amenities"
                value="parking"
                className="size-5"
              />
              <span className="text-gray-700">Parking</span>
            </label>

            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                name="amenities"
                value="furnished"
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
              id="sort"
              name="sort"
              className="border p-2 w-full focus:outline-none outline-none rounded-lg text-gray-700"
            >
              <option>Select</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
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
      <section className="bg-blue-500">
        <h1>House Listing Results</h1>
      </section>
    </main>
  );
};

export default Search;
