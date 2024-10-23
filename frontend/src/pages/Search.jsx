const Search = () => {
  return (
    <main>
      <section>
        <form className="space-y-4">
          <div>
            <label htmlFor="searchTerm" className="block mb-2">
              Search Here
            </label>
            <input
              type="text"
              id="search"
              name="search"
              className="border p-2 w-full"
              placeholder="Enter search here"
            />
          </div>

          <div>
            <p className="mb-2">Types</p>
            <label className="mr-4">
              <input type="checkbox" name="types" value="rent" /> Rent
            </label>
            <label className="mr-4">
              <input type="checkbox" name="types" value="sale" /> Sale
            </label>
            <label className="mr-4">
              <input type="checkbox" name="types" value="rentSale" /> Rent &
              Sale
            </label>
            <label>
              <input type="checkbox" name="types" value="offer" /> Offer
            </label>
          </div>

          <div>
            <p className="mb-2">Amenities</p>
            <label className="mr-4">
              <input type="checkbox" name="amenities" value="parking" /> Parking
            </label>
            <label className="mr-4">
              <input type="checkbox" name="amenities" value="bedrooms" />
              Bedrooms
            </label>
            <label className="mr-4">
              <input type="checkbox" name="amenities" value="bathrooms" />
              Bathrooms
            </label>
            <label>
              <input type="checkbox" name="amenities" value="furnished" />
              Furnished
            </label>
          </div>
          <div>
            <label htmlFor="sort" className="block mb-2">
              Sort By
            </label>
            <select id="sort" name="sort" className="border p-2 w-full">
              <option value="">Select</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </form>
      </section>
      <section>
        <h1>House Listing Results</h1>
      </section>
    </main>
  );
};

export default Search;
