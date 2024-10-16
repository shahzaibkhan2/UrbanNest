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
        <div className="flex-col xvs:flex-row items-center space-y-5 flex xvs:justify-between my-10">
          <div>
            <h4 className="font-bold text-md">Owner</h4>
            <p className="text-sm text-gray-500">Shahzaib Khan</p>
          </div>
          <div class="relative group inline-block">
            <button className="group py-3 px-7 bg-blue-900 text-white hover:bg-blue-950 rounded-full transition duration-300">
              Owner Details
            </button>
            <div class="hidden xsss:block group-hover:opacity-100 opacity-0 invisible group-hover:visible transition duration-300 absolute w-72 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2 z-10 p-2 -left-56 -top-[16rem]">
              <div class="flex items-center justify-between gap-4 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="tania andrew"
                  class="relative inline-block object-cover object-center w-12 h-12 rounded-full"
                />
                <button
                  class="select-none rounded-lg bg-gray-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
                >
                  Follow
                </button>
              </div>
              <h6 class="flex items-center gap-2 mb-2 font-sans text-sm antialiased font-medium leading-relaxed tracking-normal text-blue-gray-900">
                <span className="text-sm">Shahzaib Khan</span> •{" "}
                <a class="text-[10px] text-gray-700" href="#">
                  shahzaib@gmail.com
                </a>
              </h6>
              <p class="block font-sans text-[10px] antialiased font-normal leading-normal text-gray-700 xvs:text-md">
                A skilled developer with a passion for creating innovative
                solutions and a proven track record in full-stack development.
                Adept at working with a variety of technologies to build robust
                applications.
              </p>
              <div class="flex items-center justify-between pt-4 mt-6 border-t border-blue-gray-50">
                <p class="flex items-center gap-1 font-sans text-[10px] antialiased font-normal text-gray-700 text-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="-mt-0.5 h-3.5 w-3.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    ></path>
                  </svg>
                  United Kingdom
                </p>
                <a
                  href="#"
                  class="flex items-center gap-1 font-sans text-[10px] antialiased font-normal text-gray-700 text-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="-mt-0.5 h-3.5 w-3.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    ></path>
                  </svg>
                  London
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default SingleListing;
