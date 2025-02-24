import React, { useEffect, useState } from "react";
import axios from "axios";
import path from "path";

const List = () => {
  const url = "http://localhost:4000";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/food/show/list`);

      setList(response.data.data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeFood = async(foodId) => {

    try {
      
      await axios.post(`${url}/food/delete/image`,{id:foodId});
     await fetchList();

    } catch (error) {
      
    }

  }

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    console.log("Fetched List:", list);
   
  }, [list]);
  

  return (
    <div className="w-full">
      <div>
        <h1 className="font-semibold text-4xl p-1.5 ml-10 mt-2">
          Add food List
        </h1>
      </div>

      <hr />

      <div>
        <div className="w-5/6 m-auto border-gray-400 border-2 border-solid bg-gray-100  rounded-t-md mt-10 p-4">
          <ul className="flex w-full h-full font-semibold text-md   justify-between ">
            <li>Image</li>
            <li>Name</li>
            <li>Category</li>
            <li>Price</li>
            <li>Action</li>
          </ul>
        </div>

        <div className="w-5/6 m-auto flex flex-col  ">
          {
            list.map((item , index) => {
              return <div key={index} className="flex justify-between border-t-0 border-gray-400 border-2 border-solid p-2">
                <img src={`${url}/uploads/${item.image.split("\\").pop()}`} className="w-[4rem] " />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                {/* <p>{item.image}</p> */}

                <button onClick={() => removeFood(item._id)}>
                  x
                </button>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default List;
