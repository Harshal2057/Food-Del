import React from "react";

const Header = () => {
  return (
    <div className="w-5/6 mx-auto mt-10  rounded-4xl bg-[url(/header_img.png)] bg-cover bg-center opacity-95 h-150 flex flex-col justify-center p-20">
      <div className="flex flex-col gap-12">

        <h1 className="text-7xl font-semibold text-white flex flex-col gap-3">
          Order your <br />
          <span className="block">favourite food here</span>
        </h1>

        <h3 className="w-4/6 text-white font-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit ex cum
          doloribus in aut distinctio id officiis dolorem facilis minima
          voluptatum explicabo et magnam optio voluptatem, eaque incidunt non
          officia.
        </h3>

        <button className="border-amber-700 border-solid border-2 bg-white p-2 rounded-3xl max-w-36">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
