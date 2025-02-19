import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';

import '@fontsource/dm-sans'; // Defaults to weight 400
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
