import React from "react";

import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="" />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          New Releases This Week
        </h1>
        <p className="mb-10">
          Books are a gateway to knowledge, imagination, and endless adventures.
          They open new worlds, spark creativity, and inspire dreams. With every
          page you turn, you embark on a journey filled with wisdom, emotions,
          and limitless possibilities. Open a book, open your mind!
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
