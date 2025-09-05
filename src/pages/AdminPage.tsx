import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, products } from '../data/products';
import { Product } from '../types/Product';
import { useAdmin } from '../context/AdminContext';
import { useStock } from '../context/StockContext';

interface AdminProduct extends Product {
  isEditing?: boolean;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [showGuideEditor, setShowGuideEditor] = useState(false);
  const [editingGuideSection, setEditingGuideSection] = useState<string>('');
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showSliderEditor, setShowSliderEditor] = useState(false);
  const [editingSlider, setEditingSlider] = useState<any>(null);
  const { 
    isAuthenticated, 
    logout, 
    sliderData, 
    addSlider, 
    updateSlider, 
    deleteSlider,
    products: adminProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useAdmin();
  const { stockItems, updateStock, setLowStockThreshold } = useStock();

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'products', name: 'Ürün Yönetimi', icon: '📦' },
    { id: 'stock', name: 'Stok Yönetimi', icon: '📊' },
    { id: 'categories', name: 'Kategori Yönetimi', icon: '🏷️' },
    { id: 'slider', name: 'Slider Yönetimi', icon: '🖼️' },
    { id: 'guide', name: 'Rehber İçerikleri', icon: '📚' },
    { id: 'analytics', name: 'Analitik', icon: '📈' },
  ];

  // Filter products based on search and category
  const filteredProducts = adminProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Debug: Log products when they change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AdminPage - Products updated:', adminProducts.length, 'products');
      console.log('AdminPage - Filtered products:', filteredProducts.length, 'products');
    }
  }, [adminProducts, filteredProducts]);

  const handleAddProduct = () => {
    setShowAddForm(true);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // Sanitize productId
    const sanitizedId = productId.replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitizedId !== productId) {
      console.error('Invalid product ID format');
      return;
    }
    
    // Use a more secure confirmation method
    const confirmed = window.confirm('Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.');
    if (confirmed) {
      if (process.env.NODE_ENV === 'development') {
        console.log('AdminPage - Deleting product:', sanitizedId);
        console.log('AdminPage - Products before deletion:', adminProducts.length);
      }
      deleteProduct(sanitizedId);
      if (process.env.NODE_ENV === 'development') {
        console.log('AdminPage - Delete function called');
      }
      alert('Ürün başarıyla silindi!');
    }
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AdminPage - handleSaveProduct called with:', productData);
    }
    if (editingProduct) {
      // Update existing product
      if (process.env.NODE_ENV === 'development') {
        console.log('AdminPage - Updating product:', editingProduct.id);
      }
      updateProduct(editingProduct.id, productData);
      alert('Ürün başarıyla güncellendi!');
    } else {
      // Add new product
      if (process.env.NODE_ENV === 'development') {
        console.log('AdminPage - Adding new product');
      }
      addProduct(productData as Omit<Product, 'id'>);
      alert('Yeni ürün başarıyla eklendi!');
      
      // Force a re-render by updating the active tab
      setTimeout(() => {
        setActiveTab('products');
      }, 100);
    }
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEditGuideSection = (section: string) => {
    setEditingGuideSection(section);
    setShowGuideEditor(true);
  };

  const handleSaveGuideSection = (content: string) => {
    // Burada rehber içeriğini kaydetme işlemi yapılacak
    console.log(`Saving content for section: ${editingGuideSection}`, content);
    setShowGuideEditor(false);
    setEditingGuideSection('');
  };

  const handleCancelGuideEdit = () => {
    setShowGuideEditor(false);
    setEditingGuideSection('');
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowCategoryEditor(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      console.log('Deleting category:', categoryId);
      // Kategori silme işlemi burada yapılacak
    }
  };

  const handleSaveCategory = (categoryData: any) => {
    if (editingCategory) {
      // Kategori güncelleme
      console.log('Updating category:', categoryData);
    } else {
      // Yeni kategori ekleme
      console.log('Adding new category:', categoryData);
    }
    setShowCategoryEditor(false);
    setEditingCategory(null);
  };

  const handleCancelCategoryEdit = () => {
    setShowCategoryEditor(false);
    setEditingCategory(null);
  };

  const handleAddSlider = () => {
    setEditingSlider(null);
    setShowSliderEditor(true);
  };

  const handleEditSlider = (slide: any) => {
    setEditingSlider(slide);
    setShowSliderEditor(true);
  };

  const handleDeleteSlider = (slideId: number) => {
    if (window.confirm('Bu slider\'ı silmek istediğinizden emin misiniz?')) {
      deleteSlider(slideId);
    }
  };

  const handleSaveSlider = (slideData: any) => {
    if (editingSlider) {
      // Slider güncelleme
      updateSlider(editingSlider.id, slideData);
    } else {
      // Yeni slider ekleme
      addSlider(slideData);
    }
    setShowSliderEditor(false);
    setEditingSlider(null);
  };

  const handleCancelSliderEdit = () => {
    setShowSliderEditor(false);
    setEditingSlider(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Paneli</h1>
            <p className="text-gray-600">Sedef Akvaryum yönetim paneli</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Ürün Yönetimi</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      console.log('=== DEBUG INFO ===');
                      console.log('Total products:', adminProducts.length);
                      console.log('Filtered products:', filteredProducts.length);
                      console.log('Selected category:', selectedCategory);
                      console.log('Search term:', searchTerm);
                      console.log('All products:', adminProducts);
                      console.log('Filtered products:', filteredProducts);
                      console.log('LocalStorage products:', JSON.parse(localStorage.getItem('sedef_akvaryum_products') || '[]'));
                    }}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                  >
                    Debug
                  </button>
                  <button
                    onClick={() => {
                      console.log('=== LOCALSTORAGE DEBUG ===');
                      console.log('Current localStorage products:', localStorage.getItem('sedef_akvaryum_products'));
                      console.log('Parsed localStorage products:', JSON.parse(localStorage.getItem('sedef_akvaryum_products') || '[]'));
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    LocalStorage Debug
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('sedef_akvaryum_products');
                      window.location.reload();
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Cache Temizle
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="btn-primary"
                  >
                    + Yeni Ürün Ekle
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="sm:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Resim</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Ürün Adı</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Kategori</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Fiyat</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Stok</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.shortDescription}</div>
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <span className="inline-flex items-center gap-1">
                            {categories.find(c => c.id === product.category)?.icon}
                            {categories.find(c => c.id === product.category)?.name}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          ₺{product.price.toFixed(2)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'Stokta' : 'Stokta Yok'}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-gray-500">
                Toplam {filteredProducts.length} ürün bulundu
              </div>
            </div>
          )}

          {activeTab === 'stock' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Stok Yönetimi</h2>
                <div className="text-sm text-gray-600">
                  Toplam {stockItems.length} ürün stokta
                </div>
              </div>

              {/* Stock Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600">Stokta</p>
                      <p className="text-2xl font-bold text-green-900">
                        {stockItems.filter(item => item.quantity > item.lowStockThreshold).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-orange-600">Az Stok</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {stockItems.filter(item => item.quantity <= item.lowStockThreshold && item.quantity > 0).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-600">Stokta Yok</p>
                      <p className="text-2xl font-bold text-red-900">
                        {stockItems.filter(item => item.quantity === 0).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600">Toplam Ürün</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {stockItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Ürün</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Kategori</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Mevcut Stok</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Düşük Stok Eşiği</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Durum</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Son Güncelleme</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockItems.map((stockItem) => {
                      const product = products.find(p => p.id === stockItem.productId);
                      if (!product) return null;

                      const getStatusColor = () => {
                        if (stockItem.quantity === 0) return 'bg-red-100 text-red-800';
                        if (stockItem.quantity <= stockItem.lowStockThreshold) return 'bg-orange-100 text-orange-800';
                        return 'bg-green-100 text-green-800';
                      };

                      const getStatusText = () => {
                        if (stockItem.quantity === 0) return 'Stokta Yok';
                        if (stockItem.quantity <= stockItem.lowStockThreshold) return 'Az Stok';
                        return 'Stokta';
                      };

                      return (
                        <tr key={stockItem.productId} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">₺{product.price.toFixed(2)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <span className="inline-flex items-center gap-1">
                              {categories.find(c => c.id === product.category)?.icon}
                              {categories.find(c => c.id === product.category)?.name}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              value={stockItem.quantity}
                              onChange={(e) => updateStock(stockItem.productId, parseInt(e.target.value) || 0)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              value={stockItem.lowStockThreshold}
                              onChange={(e) => setLowStockThreshold(stockItem.productId, parseInt(e.target.value) || 0)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                              {getStatusText()}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-gray-500">
                            {new Date(stockItem.lastUpdated).toLocaleDateString('tr-TR')}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStock(stockItem.productId, stockItem.quantity + 1)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                +1
                              </button>
                              <button
                                onClick={() => updateStock(stockItem.productId, Math.max(0, stockItem.quantity - 1))}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                -1
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
             <div className="space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                 <h2 className="text-2xl font-bold text-gray-800">Kategori Yönetimi</h2>
                 <button
                   onClick={() => {
                     setEditingCategory(null);
                     setShowCategoryEditor(true);
                   }}
                   className="btn-primary"
                 >
                   + Yeni Kategori Ekle
                 </button>
               </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-500">ID: {category.id}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      Bu kategoride {adminProducts.filter(p => p.category === category.id).length} ürün bulunuyor
                    </div>
                    
                                         <div className="flex gap-2">
                       <button 
                         onClick={() => handleEditCategory(category)}
                         className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                       >
                         Düzenle
                       </button>
                       <button 
                         onClick={() => handleDeleteCategory(category.id)}
                         className="text-red-600 hover:text-red-800 text-sm font-medium"
                       >
                         Sil
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'slider' && (
             <div className="space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                 <h2 className="text-2xl font-bold text-gray-800">Slider Yönetimi</h2>
                 <button
                   onClick={handleAddSlider}
                   className="btn-primary"
                 >
                   + Yeni Slider Ekle
                 </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {sliderData.map((slide) => (
                   <div key={slide.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                     <div className="h-48 bg-gray-100 relative">
                       <img
                         src={slide.image}
                         alt={slide.title}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="p-4">
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-2xl">{slide.icon}</span>
                         <h3 className="font-semibold text-gray-800">{slide.title}</h3>
                       </div>
                       <p className="text-sm text-gray-600 mb-2">{slide.subtitle}</p>
                       <p className="text-xs text-gray-500 mb-3 line-clamp-2">{slide.description}</p>
                       <div className="flex gap-2">
                         <button
                           onClick={() => handleEditSlider(slide)}
                           className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                         >
                           Düzenle
                         </button>
                         <button
                           onClick={() => handleDeleteSlider(slide.id)}
                           className="text-red-600 hover:text-red-800 text-sm font-medium"
                         >
                           Sil
                         </button>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

          {activeTab === 'guide' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Rehber İçerikleri</h2>
              
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-blue-50 p-6 rounded-lg">
                   <h3 className="font-semibold text-blue-800 mb-4">Neocaridina Bakımı</h3>
                   <p className="text-blue-700 mb-4">Karides bakımı hakkında detaylı bilgiler</p>
                   <button 
                     onClick={() => handleEditGuideSection('neocaridina')}
                     className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                   >
                     İçeriği Düzenle
                   </button>
                 </div>
                 
                 <div className="bg-green-50 p-6 rounded-lg">
                   <h3 className="font-semibold text-green-800 mb-4">Tank Kurulumu</h3>
                   <p className="text-green-700 mb-4">Akvaryum kurulum rehberi</p>
                   <button 
                     onClick={() => handleEditGuideSection('tank-setup')}
                     className="text-green-600 hover:text-green-800 text-sm font-medium"
                   >
                     İçeriği Düzenle
                   </button>
                 </div>
                 
                 <div className="bg-purple-50 p-6 rounded-lg">
                   <h3 className="font-semibold text-purple-800 mb-4">Su Parametreleri</h3>
                   <p className="text-purple-700 mb-4">Su kalitesi ve parametreler</p>
                   <button 
                     onClick={() => handleEditGuideSection('water-params')}
                     className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                   >
                     İçeriği Düzenle
                   </button>
                 </div>
                 
                 <div className="bg-yellow-50 p-6 rounded-lg">
                   <h3 className="font-semibold text-yellow-800 mb-4">Üretim Rehberi</h3>
                   <p className="text-yellow-700 mb-4">Karides üretimi hakkında bilgiler</p>
                   <button 
                     onClick={() => handleEditGuideSection('breeding')}
                     className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                   >
                     İçeriği Düzenle
                   </button>
                 </div>

                 <div className="bg-orange-50 p-6 rounded-lg">
                   <h3 className="font-semibold text-orange-800 mb-4">Beslenme</h3>
                   <p className="text-orange-700 mb-4">Karides beslenme rehberi</p>
                   <button 
                     onClick={() => handleEditGuideSection('feeding')}
                     className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                   >
                     İçeriği Düzenle
                   </button>
                 </div>

                 <div className="bg-pink-50 p-6 rounded-lg">
                   <h3 className="font-semibold text-pink-800 mb-4">Tank Arkadaşları</h3>
                   <p className="text-pink-700 mb-4">Uyumlu balık türleri</p>
                   <button 
                     onClick={() => handleEditGuideSection('tank-mates')}
                     className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                   >
                     İçeriği Düzenle
                   </button>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Analitik</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {adminProducts.length}
                  </div>
                  <div className="text-blue-800">Toplam Ürün</div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {adminProducts.filter(p => p.inStock).length}
                  </div>
                  <div className="text-green-800">Stokta Olan</div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {adminProducts.filter(p => p.featured).length}
                  </div>
                  <div className="text-purple-800">Öne Çıkan</div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {categories.length}
                  </div>
                  <div className="text-yellow-800">Kategori</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">Kategori Dağılımı</h3>
                  <div className="space-y-3">
                    {categories.map(category => {
                      const count = adminProducts.filter(p => p.category === category.id).length;
                      const percentage = adminProducts.length > 0 ? (count / adminProducts.length) * 100 : 0;
                      return (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {count} ürün ({percentage.toFixed(1)}%)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">Fiyat Analizi</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">En Düşük Fiyat:</span>
                      <span className="text-sm font-medium">
                        ₺{Math.min(...adminProducts.map(p => p.price)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">En Yüksek Fiyat:</span>
                      <span className="text-sm font-medium">
                        ₺{Math.max(...adminProducts.map(p => p.price)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ortalama Fiyat:</span>
                      <span className="text-sm font-medium">
                        ₺{(adminProducts.reduce((sum, p) => sum + p.price, 0) / adminProducts.length).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Product Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h3>
              
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={handleCancelEdit}
                categories={categories}
              />
            </div>
          </div>
        )}

                 {/* Guide Editor Modal */}
         {showGuideEditor && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
               <h3 className="text-2xl font-bold text-gray-800 mb-6">
                 Rehber İçeriği Düzenle: {editingGuideSection}
               </h3>
               
               <GuideEditor
                 section={editingGuideSection}
                 onSave={handleSaveGuideSection}
                 onCancel={handleCancelGuideEdit}
               />
             </div>
           </div>
         )}

         {/* Category Editor Modal */}
         {showCategoryEditor && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
               <h3 className="text-2xl font-bold text-gray-800 mb-6">
                 {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
               </h3>
               
               <CategoryEditor
                 category={editingCategory}
                 onSave={handleSaveCategory}
                 onCancel={handleCancelCategoryEdit}
               />
             </div>
           </div>
         )}

         {/* Slider Editor Modal */}
         {showSliderEditor && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
               <h3 className="text-2xl font-bold text-gray-800 mb-6">
                 {editingSlider ? 'Slider Düzenle' : 'Yeni Slider Ekle'}
               </h3>
               
               <SliderEditor
                 slide={editingSlider}
                 onSave={handleSaveSlider}
                 onCancel={handleCancelSliderEdit}
               />
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

// Product Form Component
interface ProductFormProps {
  product: AdminProduct | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
  categories: typeof categories;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'fish',
    price: product?.price || 0,
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    image: product?.image || '',
    inStock: product?.inStock || true,
    featured: product?.featured || false,
    new: product?.new || false,
    colors: product?.colors || [],
    socialBehavior: product?.socialBehavior || '',
    waterParameters: product?.waterParameters || {
      temperature: '',
      pH: '',
      hardness: ''
    },
    size: product?.size || '',
    difficulty: product?.difficulty || '',
    breeding: product?.breeding || '',
    diet: product?.diet || '',
    lifespan: product?.lifespan || '',
    tankSize: product?.tankSize || '',
  });

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string>(''); // Removed unused variable

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWaterParamChange = (param: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      waterParameters: {
        ...prev.waterParameters,
        [param]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // setImagePreview(result); // Removed unused
        handleInputChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = (url: string) => {
    if (url) {
      handleInputChange('image', url);
    }
  };

  // const handleRemoveImage = (index: number) => {
  //   // This function is no longer needed since we removed multiple images support
  //   console.log('Image removal not supported in single image mode');
  // };

  // const handleSetMainImage = (imageUrl: string) => {
  //   handleInputChange('image', imageUrl);
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Adı
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fiyat (₺)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resimler (Ana resim ilk sırada olmalı)
          </label>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Yeni resim URL'si ekle"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    handleAddImageUrl(input.value);
                    input.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                  handleAddImageUrl(input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Ekle
              </button>
            </div>
            
            {/* Display current image */}
            {formData.image && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Mevcut Resim:</h4>
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Ürün resmi"
                    className="w-full h-32 object-cover rounded-lg border-2 border-primary-500"
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    Ana resim: {formData.image}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kısa Açıklama
        </label>
        <input
          type="text"
          value={formData.shortDescription}
          onChange={(e) => handleInputChange('shortDescription', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detaylı Açıklama
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      {/* Shrimp-specific fields */}
      {formData.category === 'shrimp' && (
        <div className="space-y-6 border-t pt-6">
          <h4 className="font-semibold text-gray-800">Karides Özellikleri</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Renkler (virgülle ayırın)
              </label>
              <input
                type="text"
                value={formData.colors.join(', ')}
                onChange={(e) => handleInputChange('colors', e.target.value.split(',').map(c => c.trim()))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Kırmızı, Mavi, Sarı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boyut
              </label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="2-3 cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zorluk
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Seçiniz</option>
                <option value="Kolay">Kolay</option>
                <option value="Orta">Orta</option>
                <option value="Zor">Zor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sosyal Davranış
              </label>
              <input
                type="text"
                value={formData.socialBehavior}
                onChange={(e) => handleInputChange('socialBehavior', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Barışçıl, grup halinde yaşar"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıcaklık
              </label>
              <input
                type="text"
                value={formData.waterParameters.temperature}
                onChange={(e) => handleWaterParamChange('temperature', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="18-28°C"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                pH
              </label>
              <input
                type="text"
                value={formData.waterParameters.pH}
                onChange={(e) => handleWaterParamChange('pH', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="7.0-7.6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sertlik
              </label>
              <input
                type="text"
                value={formData.waterParameters.hardness}
                onChange={(e) => handleWaterParamChange('hardness', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="9-11 dGH"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Üretim
              </label>
              <input
                type="text"
                value={formData.breeding}
                onChange={(e) => handleInputChange('breeding', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Kolay üretim"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beslenme
              </label>
              <input
                type="text"
                value={formData.diet}
                onChange={(e) => handleInputChange('diet', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Omnivor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yaşam Süresi
              </label>
              <input
                type="text"
                value={formData.lifespan}
                onChange={(e) => handleInputChange('lifespan', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="1-2 yıl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Tank Boyutu
              </label>
              <input
                type="text"
                value={formData.tankSize}
                onChange={(e) => handleInputChange('tankSize', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Minimum 20L"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => handleInputChange('inStock', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">Stokta</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleInputChange('featured', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">Öne Çıkan</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.new}
            onChange={(e) => handleInputChange('new', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">Yeni</span>
        </label>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="btn-primary"
        >
          {product ? 'Güncelle' : 'Ekle'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

// Guide Editor Component
interface GuideEditorProps {
  section: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const GuideEditor: React.FC<GuideEditorProps> = ({ section, onSave, onCancel }) => {
  const [content, setContent] = useState('');

  const sectionTitles: { [key: string]: string } = {
    'neocaridina': 'Neocaridina Bakımı',
    'tank-setup': 'Tank Kurulumu',
    'water-params': 'Su Parametreleri',
    'breeding': 'Üretim Rehberi',
    'feeding': 'Beslenme',
    'tank-mates': 'Tank Arkadaşları'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {sectionTitles[section]} İçeriği
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder={`${sectionTitles[section]} içeriğini buraya yazın...`}
        />
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="btn-primary"
        >
          Kaydet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

// Category Editor Component
interface CategoryEditorProps {
  category: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    icon: category?.icon || '🏷️',
    description: category?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategori Adı
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          İkon (Emoji)
        </label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => handleInputChange('icon', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="🏷️"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Açıklama
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="btn-primary"
        >
          {category ? 'Güncelle' : 'Ekle'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

// Slider Editor Component
interface SliderEditorProps {
  slide: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const SliderEditor: React.FC<SliderEditorProps> = ({ slide, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    description: slide?.description || '',
    image: slide?.image || '',
    icon: slide?.icon || '🖼️',
    buttonText: slide?.buttonText || '',
    buttonLink: slide?.buttonLink || '',
    category: slide?.category || 'fish'
  });

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string>(''); // Removed unused variable

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // setImagePreview(result); // Removed unused
        handleInputChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlık
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Başlık
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Açıklama
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İkon (Emoji)
          </label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => handleInputChange('icon', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="🖼️"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="fish">Balık</option>
            <option value="shrimp">Karides</option>
            <option value="food">Yem</option>
            <option value="accessories">Aksesuar</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buton Metni
          </label>
          <input
            type="text"
            value={formData.buttonText}
            onChange={(e) => handleInputChange('buttonText', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buton Linki
          </label>
          <input
            type="text"
            value={formData.buttonLink}
            onChange={(e) => handleInputChange('buttonLink', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resim
        </label>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="Veya resim URL'si girin"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {formData.image && (
            <div className="mt-4">
              <img
                src={formData.image}
                alt="Önizleme"
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="btn-primary"
        >
          {slide ? 'Güncelle' : 'Ekle'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

export default AdminPage;
