import React, { useRef } from "react";
import BlueButton from "../components/buttons/BlueButton";
import { HiOutlineUpload } from "react-icons/hi";

const CreateHouseListing = () => {
  const imgOneRef = useRef(null);
  const imgTwoRef = useRef(null);
  const imgThreeRef = useRef(null);
  const imgFourRef = useRef(null);
  const imgFiveRef = useRef(null);

  const handleClick = () => {
    if (imgOneRef.current) {
      imgOneRef.current.click();
    } else if (imgTwoRef.current) {
      imgTwoRef.current.click();
    } else if (imgThreeRef.current) {
      imgThreeRef.current.click();
    } else if (imgFourRef.current) {
      imgFourRef.current.click();
    } else if (imgFiveRef.current) {
      imgFiveRef.current.click();
    }
  };
  return (
    <main className="mt-32 flex flex-col create-house-listing gap-16">
      <h1 className="text-center text-3xl font-semibold text-blue-900">
        Create a House List
      </h1>
      <form className="max-w-[1000px] lg:max-w-[1200px] flex flex-col lg:flex-row mx-auto gap-20 px-[5%]">
        <section className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-3 mb-6">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
                type="text"
                placeholder="Description about house..."
                rows="8"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="pb-8 pt-2 flex justify-between text-nowrap flex-wrap gap-y-8 gap-x-2">
            <div className="flex gap-2">
              <input type="checkbox" className="size-5" />
              <span className="text-md text-blue-900 font-semibold">
                Furnished
              </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="size-5" />
              <span className="text-md text-blue-900 font-semibold">
                Parking Garrage
              </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="size-5" />
              <span className="text-md text-blue-900 font-semibold">Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="size-5" />
              <span className="text-md text-blue-900 font-semibold">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="size-5" />
              <span className="text-md text-blue-900 font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex gap-3 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="$100"
                min="1"
              />
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Price
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="1"
                min="1"
                max="8"
              />
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Bathrooms
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="1"
                min="1"
                max="8"
              />
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Bedrooms
              </label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="$100"
              />
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Discount Price
              </label>
            </div>
          </div>
        </section>
        <section className="flex flex-col flex-1 text-center">
          <div className="flex mb-4 text-md md:text-lg font-semibold text-blue-950">
            <div className="flex justify-center items-center w-2/3 bg-yellow-200 h-40 text-wrap">
              Upload cover image
            </div>
            <div className="flex justify-center items-center w-1/3 bg-yellow-100 h-40 text-wrap">
              Upload image 1
            </div>
          </div>

          <div className="flex  mb-4 gap-6">
            <input ref={imgOneRef} type="file" className="hidden" />
            <BlueButton onClick={handleClick}>
              Upload <HiOutlineUpload className="size-5" />
            </BlueButton>
            <input ref={imgTwoRef} type="file" className="hidden" />
            <BlueButton onClick={handleClick}>
              Upload <HiOutlineUpload className="size-5" />
            </BlueButton>
          </div>

          <div className="flex text-md md:text-lg font-semibold text-blue-950">
            <div className="flex justify-center items-center w-1/2 bg-yellow-200 h-40 text-wrap">
              Upload image 2
            </div>
            <div className="flex justify-center items-center w-1/2 bg-yellow-100 h-40 text-wrap">
              Upload image 3
            </div>
            <div className="flex justify-center items-center w-1/2 bg-yellow-200 h-40 text-wrap">
              Upload image 4
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <input ref={imgThreeRef} type="file" className="hidden" />
            <BlueButton onClick={handleClick}>
              Upload <HiOutlineUpload className="size-5" />
            </BlueButton>
            <input ref={imgFourRef} type="file" className="hidden" />
            <BlueButton onClick={handleClick}>
              Upload <HiOutlineUpload className="size-5" />
            </BlueButton>
            <input ref={imgFiveRef} type="file" className="hidden" />
            <BlueButton onClick={handleClick}>
              Upload <HiOutlineUpload className="size-5" />
            </BlueButton>
          </div>
        </section>
      </form>
    </main>
  );
};

export default CreateHouseListing;
