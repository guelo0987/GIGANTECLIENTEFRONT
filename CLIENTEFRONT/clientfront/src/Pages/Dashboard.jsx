import { useState, useEffect } from 'react';
import { endpoints } from '../Api/Endpoints';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import SearchBar from '../Components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFaucet, 
  faTruck, 
  faBolt, 
  faPaintRoller,
  faToolbox,
  faHome,
  faSquare
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { name: 'PLOMERIA', icon: faFaucet },
    { name: 'CONTRUCCIÓN', icon: faTruck },
    { name: 'ELÉCTRICOS', icon: faBolt },
    { name: 'PINTURA', icon: faPaintRoller },
    { name: 'FERRETEROS', icon: faToolbox },
    { name: 'HOGAR', icon: faHome },
    { name: 'CERAMICA', icon: faSquare },
  ];

  // useEffect(() => {
  //   const fetchBanners = async () => {
  //     try {
  //       const response = await fetch(endpoints.banner.getBanner);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch banners');
  //       }
  //       const data = await response.json();
  //       setBanners(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBanners();
  // }, []);

  return (
    <div className="min-h-screen">
      {/* Header y Banner con fondo blanco */}
      <div className="bg-white">
        <Header />
        <Banner />
      </div>

      {/* SearchBar con fondo blanco */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </div>

      {/* Contenido principal con fondo gris */}
      <div className="bg-[#fbfbfb] min-h-screen">
        <main className="container mx-auto px-4 py-8">
          {/* Grid de Categorías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div 
                key={category.name}
                className="flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-white rounded-xl hover:shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <FontAwesomeIcon 
                  icon={category.icon} 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 mb-2 sm:mb-3 md:mb-4 text-gray-900"
                />
                <span className="text-xs sm:text-sm md:text-base font-medium text-center text-gray-900">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
