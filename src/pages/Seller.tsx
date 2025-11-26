import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SellerInfoPage from './Seller/SellerInfoPage';
import SellerAuthForm from './Seller/SellerAuthForm';
import SellerDashboard from './Seller/SellerDashboard';

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  registeredAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Seller() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  useEffect(() => {
    const savedSeller = localStorage.getItem('seller_user');
    if (savedSeller) {
      const sellerData = JSON.parse(savedSeller);
      setSeller(sellerData);
      setShowInfo(false);
      
      const savedProducts = localStorage.getItem(`seller_${sellerData.id}_products`);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    }
  }, []);

  const handleRegister = () => {
    if (!name || !email || !phone || !shopName || !password) {
      alert('Заполните все поля');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newSeller: Seller = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        shopName,
        registeredAt: new Date().toISOString()
      };
      
      const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');
      sellers.push({ ...newSeller, password });
      localStorage.setItem('sellers', JSON.stringify(sellers));
      localStorage.setItem('seller_user', JSON.stringify(newSeller));
      
      setSeller(newSeller);
      setShowInfo(false);
      setLoading(false);
      setName('');
      setEmail('');
      setPhone('');
      setShopName('');
      setPassword('');
    }, 800);
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert('Заполните email и пароль');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');
      const foundSeller = sellers.find((s: any) => s.email === email && s.password === password);
      
      if (foundSeller) {
        const { password: _, ...sellerWithoutPassword } = foundSeller;
        localStorage.setItem('seller_user', JSON.stringify(sellerWithoutPassword));
        setSeller(sellerWithoutPassword);
        setShowInfo(false);
        
        const savedProducts = localStorage.getItem(`seller_${sellerWithoutPassword.id}_products`);
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      } else {
        alert('Неверный email или пароль');
      }
      
      setLoading(false);
      setEmail('');
      setPassword('');
    }, 800);
  };

  const handleAddProduct = () => {
    if (!productName || !productDesc || !productPrice || !productImage) {
      alert('Заполните все поля');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName,
      description: productDesc,
      price: parseFloat(productPrice),
      image: productImage
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(`seller_${seller!.id}_products`, JSON.stringify(updatedProducts));
    
    setShowAddProduct(false);
    setProductName('');
    setProductDesc('');
    setProductPrice('');
    setProductImage('');
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(`seller_${seller!.id}_products`, JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem('seller_user');
    setSeller(null);
    setProducts([]);
    setShowInfo(true);
    navigate('/seller');
  };

  if (showInfo) {
    return <SellerInfoPage onNavigateToAuth={() => setShowInfo(false)} />;
  }

  if (!seller) {
    return (
      <SellerAuthForm
        isLogin={isLogin}
        loading={loading}
        name={name}
        email={email}
        phone={phone}
        shopName={shopName}
        password={password}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPhoneChange={setPhone}
        onShopNameChange={setShopName}
        onPasswordChange={setPassword}
        onToggleMode={() => setIsLogin(!isLogin)}
        onSubmit={isLogin ? handleLogin : handleRegister}
        onBack={() => setShowInfo(true)}
      />
    );
  }

  return (
    <SellerDashboard
      seller={seller}
      products={products}
      showAddProduct={showAddProduct}
      productName={productName}
      productDesc={productDesc}
      productPrice={productPrice}
      productImage={productImage}
      onProductNameChange={setProductName}
      onProductDescChange={setProductDesc}
      onProductPriceChange={setProductPrice}
      onProductImageChange={setProductImage}
      onShowAddProduct={setShowAddProduct}
      onAddProduct={handleAddProduct}
      onDeleteProduct={handleDeleteProduct}
      onLogout={handleLogout}
    />
  );
}
