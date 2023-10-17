import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "./App.css";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      <div className="max-w-xs md:max-w-2xl lg:max-w-7xl mx-auto mt-3">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden"
              >
                <img
                  classNamee="object-cover transform duration-700 backdrop-opacity-100 rounded-md w-full h-full hover:scale-125"
                  src={image.url}
                  alt={image.alt}
                />
                <div className="absolute bg-gradient-to-t from-black w-full h-full rounded-lg transform duration-500 inset-y-3/4 group-hover:-inset-y-0 ">
                  <button className="absolute right-16 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-10">
                    
                    {<FavoriteIcon className="favorite-icon text-gray-500 hover:text-red-500"/>}
                  </button>
                  <button className="absolute right-3 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-10">
                  {<AddIcon className="Add-icon hover:scale-125"/>}
                  </button>
                  <button className="absolute left-3 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-10">
                  {<DeleteIcon className="delete-icon text-gray-500 hover:text-black"/>}
                  </button>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </>
  );
};

export default App;

// how to add styles in mui icons?

