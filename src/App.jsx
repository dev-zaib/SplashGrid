import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [cats, setCats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        const catsData = response.data;
        setCats(catsData);
      } catch (error) {
        console.error("Error fetching cat images:", error);
        setCats(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center space-x-4">
      {cats !== null ? (
        cats.map((cat, index) => (
          <div key={index} className="masonry-item w-1/3">
            <img src={cat.url} alt="cat" className="w-full h-auto" />
          </div>
        ))
      ) : (
        <p>Loading cats...</p>
      )}
    </div>
  );
};

export default App;
