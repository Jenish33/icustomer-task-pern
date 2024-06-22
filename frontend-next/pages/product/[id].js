import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, isLoggedIn } from '../auth';
import { useRouter } from 'next/router';
import ProductTable from '../components/ProductTable';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Product Catalog</h1>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search by category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default Home;
