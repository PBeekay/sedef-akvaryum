import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, products } from '../data/products';
import { Product } from '../types/Product';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../context/AuthContext';
import { useStock } from '../context/StockContext';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface AdminProduct extends Product {
  isEditing?: boolean;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showSliderEditor, setShowSliderEditor] = useState(false);
  const [editingSlider, setEditingSlider] = useState<any>(null);
  const { 
    isAuthenticated, 
    sliderData, 
    addSlider, 
    updateSlider, 
    deleteSlider,
    products: adminProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useAdmin();
  
  const { logout } = useAuth();
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
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'products', name: 'Ürün Yönetimi', icon: '📦' },
    { id: 'stock', name: 'Stok Yönetimi', icon: '📊' },
    { id: 'categories', name: 'Kategori Yönetimi', icon: '🏷️' },
    { id: 'slider', name: 'Slider Yönetimi', icon: '🖼️' },
    { id: 'analytics', name: 'Analitik', icon: '📈' },
  ];

  // Filter products based on search and category
  const filteredProducts = adminProducts.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         false;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Debug: Log products when they change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
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

  const handleDeleteProduct = async (productId: string) => {
    // Sanitize productId
    const sanitizedId = productId.replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitizedId !== productId) {
      return;
    }
    
    // Use a more secure confirmation method
    const confirmed = window.confirm('Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.');
    if (confirmed) {
      try {
        await deleteProduct(sanitizedId);
        alert('✅ Ürün başarıyla silindi!');
      } catch (error: any) {
        const errorMessage = error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        alert(`❌ Hata: ${errorMessage}`);
        console.error('Ürün silme hatası:', error);
      }
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, productData);
        alert('✅ Ürün başarıyla güncellendi!');
      } else {
        // Add new product
        await addProduct(productData as Omit<Product, 'id'>);
        alert('✅ Yeni ürün başarıyla eklendi!');
      }
      
      // Close form and reset state only on success
      setShowAddForm(false);
      setEditingProduct(null);
      
      // Force a re-render by updating the active tab
      setTimeout(() => {
        setActiveTab('products');
      }, 100);
    } catch (error: any) {
      // Show error message to user
      const errorMessage = error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      alert(`❌ Hata: ${errorMessage}`);
      console.error('Ürün kaydetme hatası:', error);
      
      // Don't close the form if there's an error, so user can fix and retry
    }
  };

  const handleCancelEdit = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };


  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowCategoryEditor(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      // Kategori silme işlemi burada yapılacak
    }
  };

  const handleSaveCategory = (categoryData: any) => {
    if (editingCategory) {
      // Kategori güncelleme
    } else {
      // Yeni kategori ekleme
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

  const handleDeleteSlider = async (slideId: string) => {
    if (window.confirm('Bu slider\'ı silmek istediğinizden emin misiniz?')) {
      try {
        await deleteSlider(slideId);
        alert('✅ Slider başarıyla silindi!');
      } catch (error: any) {
        const errorMessage = error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        alert(`❌ Hata: ${errorMessage}`);
        console.error('Slider silme hatası:', error);
      }
    }
  };

  const handleSaveSlider = async (slideData: any) => {
    try {
      if (editingSlider) {
        // Slider güncelleme
        await updateSlider(editingSlider.id, slideData);
        alert('✅ Slider başarıyla güncellendi!');
      } else {
        // Yeni slider ekleme
        await addSlider(slideData);
        alert('✅ Yeni slider başarıyla eklendi!');
      }
      
      // Close form and reset state only on success
      setShowSliderEditor(false);
      setEditingSlider(null);
    } catch (error: any) {
      // Show error message to user
      const errorMessage = error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      alert(`❌ Hata: ${errorMessage}`);
      console.error('Slider kaydetme hatası:', error);
      
      // Don't close the form if there's an error, so user can fix and retry
    }
  };

  const handleCancelSliderEdit = () => {
    setShowSliderEditor(false);
    setEditingSlider(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">Admin Paneli</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Sedef Akvaryum yönetim paneli</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-red-600/10 flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>

        {/* Tabs - Scrollable horizontal bar on mobile */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span className="text-base sm:text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 lg:p-8">
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Ürün Yönetimi</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      localStorage.removeItem('sedef_akvaryum_products');
                      window.location.reload();
                    }}
                    className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    🔄 Cache Temizle
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="flex-1 sm:flex-none btn-zen py-2 px-4 text-xs font-bold shadow-md shadow-emerald-950/20"
                  >
                    + Yeni Ürün Ekle
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none"
                  />
                </div>
                <div className="sm:w-56">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
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

              {/* Products Responsive List / Table */}
              <div className="overflow-hidden border border-slate-200 rounded-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="px-3 py-3">Resim</th>
                        <th className="px-3 py-3">Ürün Adı</th>
                        <th className="px-3 py-3">Kategori</th>
                        <th className="px-3 py-3">Fiyat</th>
                        <th className="px-3 py-3">Stok</th>
                        <th className="px-3 py-3 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-3 py-2.5 shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="font-bold text-slate-800 text-xs sm:text-sm">{product.name}</div>
                            {product.shortDescription && (
                              <div className="text-[11px] text-slate-400 line-clamp-1 max-w-[200px]">{product.shortDescription}</div>
                            )}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                              {categories.find(c => c.id === product.category)?.icon}
                              {categories.find(c => c.id === product.category)?.name}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-bold text-emerald-700 whitespace-nowrap">
                            ₺{product.price.toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              product.inStock 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.inStock ? 'Stokta' : 'Stokta Yok'}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg transition-colors text-[11px]"
                              >
                                Düzenle
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 font-bold rounded-lg transition-colors text-[11px]"
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
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-500">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-emerald-50/80 p-3 sm:p-4 rounded-xl border border-emerald-200/80">
                  <div className="flex items-center">
                    <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-2.5">
                      <p className="text-[11px] font-bold text-emerald-700">Stokta</p>
                      <p className="text-xl font-black text-emerald-950">
                        {stockItems.filter(item => item.quantity > item.lowStockThreshold).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/80 p-3 sm:p-4 rounded-xl border border-amber-200/80">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-2.5">
                      <p className="text-[11px] font-bold text-amber-700">Az Stok</p>
                      <p className="text-xl font-black text-amber-950">
                        {stockItems.filter(item => item.quantity <= item.lowStockThreshold && item.quantity > 0).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50/80 p-3 sm:p-4 rounded-xl border border-red-200/80">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="ml-2.5">
                      <p className="text-[11px] font-bold text-red-700">Stokta Yok</p>
                      <p className="text-xl font-black text-red-950">
                        {stockItems.filter(item => item.quantity === 0).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/80 p-3 sm:p-4 rounded-xl border border-blue-200/80">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-2.5">
                      <p className="text-[11px] font-bold text-blue-700">Toplam Ürün</p>
                      <p className="text-xl font-black text-blue-950">
                        {stockItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Table */}
              <div className="overflow-hidden border border-slate-200 rounded-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="px-3 py-3">Ürün</th>
                        <th className="px-3 py-3">Kategori</th>
                        <th className="px-3 py-3">Mevcut Stok</th>
                        <th className="px-3 py-3">Eşik</th>
                        <th className="px-3 py-3">Durum</th>
                        <th className="px-3 py-3 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stockItems.map((stockItem) => {
                        const product = products.find(p => p.id === stockItem.productId);
                        if (!product) return null;

                        const getStatusColor = () => {
                          if (stockItem.quantity === 0) return 'bg-red-100 text-red-800';
                          if (stockItem.quantity <= stockItem.lowStockThreshold) return 'bg-amber-100 text-amber-800';
                          return 'bg-emerald-100 text-emerald-800';
                        };

                        const getStatusText = () => {
                          if (stockItem.quantity === 0) return 'Stokta Yok';
                          if (stockItem.quantity <= stockItem.lowStockThreshold) return 'Az Stok';
                          return 'Stokta';
                        };

                        return (
                          <tr key={stockItem.productId} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-slate-800 text-xs sm:text-sm">{product.name}</div>
                                  <div className="text-[11px] text-emerald-700 font-bold">₺{product.price.toFixed(2)}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                {categories.find(c => c.id === product.category)?.icon}
                                {categories.find(c => c.id === product.category)?.name}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                value={stockItem.quantity}
                                onChange={(e) => updateStock(stockItem.productId, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20"
                              />
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                value={stockItem.lowStockThreshold}
                                onChange={(e) => setLowStockThreshold(stockItem.productId, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-center font-semibold text-slate-600 outline-none"
                              />
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor()}`}>
                                {getStatusText()}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => updateStock(stockItem.productId, stockItem.quantity + 1)}
                                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold rounded-lg text-xs"
                                >
                                  +1
                                </button>
                                <button
                                  onClick={() => updateStock(stockItem.productId, Math.max(0, stockItem.quantity - 1))}
                                  className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 font-extrabold rounded-lg text-xs"
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

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard</h2>
                <div className="text-xs sm:text-sm text-slate-500">
                  Mağazanızın anlık özet verileri ve hızlı kısayollar.
                </div>
              </div>
              
              {/* Quick Stats - 2 Columns on Mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 sm:p-6 rounded-2xl text-white shadow-lg shadow-blue-500/10">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="text-2xl sm:text-3xl">📦</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">Toplam</div>
                  </div>
                  <div className="text-2xl sm:text-4xl font-black mb-0.5">{adminProducts.length}</div>
                  <div className="text-xs opacity-90 font-medium">Ürün</div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-4 sm:p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/10">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="text-2xl sm:text-3xl">✓</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">Stokta</div>
                  </div>
                  <div className="text-2xl sm:text-4xl font-black mb-0.5">{adminProducts.filter(p => p.inStock).length}</div>
                  <div className="text-xs opacity-90 font-medium">Ürün</div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 sm:p-6 rounded-2xl text-white shadow-lg shadow-amber-500/10">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="text-2xl sm:text-3xl">⭐</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">Öne Çıkan</div>
                  </div>
                  <div className="text-2xl sm:text-4xl font-black mb-0.5">{adminProducts.filter(p => p.featured).length}</div>
                  <div className="text-xs opacity-90 font-medium">Ürün</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 sm:p-6 rounded-2xl text-white shadow-lg shadow-purple-500/10">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="text-2xl sm:text-3xl">🆕</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">Yeni</div>
                  </div>
                  <div className="text-2xl sm:text-4xl font-black mb-0.5">{adminProducts.filter(p => p.new).length}</div>
                  <div className="text-xs opacity-90 font-medium">Ürün</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3">Hızlı İşlemler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => { setActiveTab('products'); setShowAddForm(true); }}
                    className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-blue-50/80 hover:bg-blue-100 text-blue-900 rounded-xl transition-all border border-blue-200/80 active:scale-[0.98]"
                  >
                    <div className="text-2xl shrink-0">➕</div>
                    <div className="text-left">
                      <div className="font-bold text-xs sm:text-sm text-blue-950">Yeni Ürün Ekle</div>
                      <div className="text-[11px] text-blue-700 font-medium mt-0.5">Mağazaya ürün ekleyin</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('slider')}
                    className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-purple-50/80 hover:bg-purple-100 text-purple-900 rounded-xl transition-all border border-purple-200/80 active:scale-[0.98]"
                  >
                    <div className="text-2xl shrink-0">🖼️</div>
                    <div className="text-left">
                      <div className="font-bold text-xs sm:text-sm text-purple-950">Slider Düzenle</div>
                      <div className="text-[11px] text-purple-700 font-medium mt-0.5">Anasayfa vitrinini yönetin</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('stock')}
                    className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 rounded-xl transition-all border border-emerald-200/80 active:scale-[0.98]"
                  >
                    <div className="text-2xl shrink-0">📊</div>
                    <div className="text-left">
                      <div className="font-bold text-xs sm:text-sm text-emerald-950">Stok Yönetimi</div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Stok durumunu güncelleyin</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Category Overview */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3">Kategori Dağılımı</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {categories.map(cat => {
                    const categoryProducts = adminProducts.filter(p => p.category === cat.id);
                    return (
                      <div key={cat.id} className="bg-slate-50 border border-slate-200/80 p-3 sm:p-4 rounded-xl text-center">
                        <div className="text-2xl sm:text-3xl mb-1">{cat.icon}</div>
                        <div className="text-xs font-bold text-slate-800 mb-0.5 truncate">{cat.name}</div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-600">{categoryProducts.length}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                          {categoryProducts.filter(p => p.inStock).length} stokta
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Son Eklenen Ürünler</h3>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Tümünü Gör →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {adminProducts.slice(0, 6).map(product => (
                    <div key={product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 truncate">{product.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{categories.find(c => c.id === product.category)?.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary-600">₺{product.price}</span>
                          {product.inStock ? (
                            <span className="text-xs text-green-600">✓ Stokta</span>
                          ) : (
                            <span className="text-xs text-red-600">Stokta Yok</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
    images: product?.images || [],
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
    // Yeni eklenen alanlar
    quickInfo: product?.quickInfo || {
      size: '',
      temperament: '',
      careLevel: ''
    },
    careInfo: product?.careInfo || {
      diet: '',
      family: '',
      origin: '',
      aquariumSize: '',
      lifespan: ''
    },
    // Bitki özellikleri için ek alanlar
    lightRequirement: product?.lightRequirement || '',
    co2Requirement: product?.co2Requirement || '',
    growthRate: product?.growthRate || '',
    placement: product?.placement || '',
    species: product?.species || '',
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploading, setUploading] = useState(false);

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

  const handleQuickInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      quickInfo: {
        ...prev.quickInfo,
        [field]: value
      }
    }));
  };

  const handleCareInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      careInfo: {
        ...prev.careInfo,
        [field]: value
      }
    }));
  };

  // File upload handler - kept for potential future use
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const result = e.target?.result as string;
  //       handleInputChange('image', result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const currentImages = formData.images || [];
    const uploadPromises: Promise<string>[] = [];

    // Her dosya için Firebase Storage'a yükleme
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`Geçersiz dosya türü: ${file.name}. Lütfen sadece resim dosyası seçin.`);
        return;
      }

      const uploadPromise = new Promise<string>((resolve, reject) => {
        // Storage'da dosya yolu: products/timestamp-filename
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const storageRef = ref(storage, `products/${fileName}`);

        // Yükleme işlemini başlat
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Progress takibi
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prev) => ({
              ...prev,
              [fileName]: progress
            }));
          },
          (error) => {
            console.error('Upload error:', error);
            reject(new Error(`${file.name} yüklenirken hata oluştu: ${error.message}`));
          },
          async () => {
            // Yükleme tamamlandı, URL'i al
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(new Error(`${file.name} için URL alınırken hata oluştu`));
            }
          }
        );
      });

      uploadPromises.push(uploadPromise);
    });

    try {
      // Tüm yüklemelerin tamamlanmasını bekle
      const uploadedUrls = await Promise.all(uploadPromises);
      const updatedImages = [...currentImages, ...uploadedUrls.filter(Boolean)];
      
      handleInputChange('images', updatedImages);
      if (!formData.image && updatedImages.length > 0) {
        handleInputChange('image', updatedImages[0]);
      }
      
      // Progress'i temizle
      setUploadProgress({});
      setUploading(false);
      
      // Input'u temizle (aynı dosyayı tekrar seçebilmek için)
      if (e.target) {
        e.target.value = '';
      }
    } catch (err: any) {
      setUploading(false);
      setUploadProgress({});
      alert(err.message || 'Görseller yüklenirken bir hata oluştu');
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      const currentImages = formData.images || [];
      // Add to images array
      handleInputChange('images', [...currentImages, newImageUrl.trim()]);
      // If this is the first image, also set it as the main image
      if (!formData.image) {
        handleInputChange('image', newImageUrl.trim());
      }
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = formData.images || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    handleInputChange('images', newImages);
    
    // If we removed the main image, set the first remaining image as main
    if (currentImages[index] === formData.image && newImages.length > 0) {
      handleInputChange('image', newImages[0]);
    } else if (newImages.length === 0) {
      handleInputChange('image', '');
    }
  };

  const handleSetMainImage = (imageUrl: string) => {
    handleInputChange('image', imageUrl);
  };

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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Görselleri
          </label>
          <div className="space-y-4">
            {/* File Upload */}
            <div 
              className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors ${
                uploading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-primary-400 cursor-pointer'
              }`}
              onDragOver={(e) => {
                if (uploading) return;
                e.preventDefault();
                e.currentTarget.classList.add('border-primary-400', 'bg-primary-50');
              }}
              onDragLeave={(e) => {
                if (uploading) return;
                e.preventDefault();
                e.currentTarget.classList.remove('border-primary-400', 'bg-primary-50');
              }}
              onDrop={(e) => {
                if (uploading) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                e.currentTarget.classList.remove('border-primary-400', 'bg-primary-50');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                  // Create a fake event object for handleFileUpload
                  const fakeEvent = {
                    target: { files }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleFileUpload(fakeEvent);
                }
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
                multiple
                disabled={uploading}
              />
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center gap-2 ${
                  uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                <div className="text-4xl">{uploading ? '⏳' : '📁'}</div>
                <div className="text-sm font-medium text-gray-700">
                  {uploading ? 'Yükleniyor...' : 'Dosya Seç veya Sürükle'}
                </div>
                <div className="text-xs text-gray-500">
                  JPG, PNG, GIF
                </div>
              </label>
            </div>

            {/* Upload Progress */}
            {uploading && Object.keys(uploadProgress).length > 0 && (
              <div className="space-y-2">
                {Object.entries(uploadProgress).map(([fileName, progress]) => (
                  <div key={fileName} className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="truncate flex-1">{fileName}</span>
                      <span className="ml-2">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            {/* Add Image URL */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Resim URL'si ekle"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                ➕ Ekle
              </button>
            </div>
            
            {/* Image Gallery */}
            {formData.images && formData.images.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Mevcut Görseller:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Ürün görseli ${index + 1}`}
                        className={`w-full h-32 object-cover rounded-lg border-2 transition-all ${
                          formData.image === imageUrl 
                            ? 'border-green-500 ring-2 ring-green-300' 
                            : 'border-gray-300'
                        }`}
                      />
                      
                      {/* Main Image Badge */}
                      {formData.image === imageUrl && (
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          ⭐ Ana
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        {formData.image !== imageUrl && (
                          <button
                            type="button"
                            onClick={() => handleSetMainImage(imageUrl)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                            title="Ana görsel yap"
                          >
                            ⭐ Ana Yap
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          title="Sil"
                        >
                          🗑️ Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 İpucu: Ana görsel ürün kartlarında gösterilir. Diğer görseller ürün detay sayfasında galeri olarak görünür.
                </p>
              </div>
            )}
            
            {/* No Images State */}
            {(!formData.images || formData.images.length === 0) && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-gray-500 text-sm">Henüz görsel eklenmedi</p>
                <p className="text-gray-400 text-xs mt-1">Yukarıdaki alandan görsel URL'si ekleyin</p>
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

      {/* Fish-specific fields */}
      {formData.category === 'fish' && (
        <div className="space-y-6 border-t pt-6">
          <h4 className="font-semibold text-gray-800">Balık Özellikleri</h4>
          
          {/* Quick Info Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Hızlı Bilgiler</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boyut
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.size}
                  onChange={(e) => handleQuickInfoChange('size', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="4 cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mizaç
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.temperament}
                  onChange={(e) => handleQuickInfoChange('temperament', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Peaceful"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bakım Seviyesi
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.careLevel}
                  onChange={(e) => handleQuickInfoChange('careLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Easy"
                />
              </div>
            </div>
          </div>

          {/* Care Info Section */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Bakım Bilgileri</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beslenme
                </label>
                <input
                  type="text"
                  value={formData.careInfo.diet}
                  onChange={(e) => handleCareInfoChange('diet', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Omnivore"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aile
                </label>
                <input
                  type="text"
                  value={formData.careInfo.family}
                  onChange={(e) => handleCareInfoChange('family', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Characidae"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menşei
                </label>
                <input
                  type="text"
                  value={formData.careInfo.origin}
                  onChange={(e) => handleCareInfoChange('origin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Güney Amerika"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Akvaryum Boyutu
                </label>
                <input
                  type="text"
                  value={formData.careInfo.aquariumSize}
                  onChange={(e) => handleCareInfoChange('aquariumSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="40 Litre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yaşam Süresi
                </label>
                <input
                  type="text"
                  value={formData.careInfo.lifespan}
                  onChange={(e) => handleCareInfoChange('lifespan', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="3-5 yıl"
                />
              </div>
            </div>
          </div>

          {/* Water Parameters Section */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Su Değerleri</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sıcaklık
                </label>
                <input
                  type="text"
                  value={formData.waterParameters.temperature}
                  onChange={(e) => handleWaterParamChange('temperature', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="22-26°C"
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
                  placeholder="6.0-7.0"
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
                  placeholder="2-10 dGH"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shrimp-specific fields */}
      {formData.category === 'shrimp' && (
        <div className="space-y-6 border-t pt-6">
          <h4 className="font-semibold text-gray-800">Karides Özellikleri</h4>
          
          {/* Quick Info Section */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Hızlı Bilgiler</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boyut
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.size}
                  onChange={(e) => handleQuickInfoChange('size', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="2-3 cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mizaç
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.temperament}
                  onChange={(e) => handleQuickInfoChange('temperament', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Barışçıl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bakım Seviyesi
                </label>
                <select
                  value={formData.quickInfo.careLevel}
                  onChange={(e) => handleQuickInfoChange('careLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="Çok Kolay">Çok Kolay</option>
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                  <option value="Zor">Zor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Care Info Section */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Bakım Bilgileri</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beslenme
                </label>
                <input
                  type="text"
                  value={formData.careInfo.diet}
                  onChange={(e) => handleCareInfoChange('diet', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Omnivor, yosun, biyofilm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aile
                </label>
                <input
                  type="text"
                  value={formData.careInfo.family}
                  onChange={(e) => handleCareInfoChange('family', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Atyidae"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menşei
                </label>
                <input
                  type="text"
                  value={formData.careInfo.origin}
                  onChange={(e) => handleCareInfoChange('origin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Güneydoğu Asya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Akvaryum Boyutu
                </label>
                <input
                  type="text"
                  value={formData.careInfo.aquariumSize}
                  onChange={(e) => handleCareInfoChange('aquariumSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Minimum 20L"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yaşam Süresi
                </label>
                <input
                  type="text"
                  value={formData.careInfo.lifespan}
                  onChange={(e) => handleCareInfoChange('lifespan', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="1-2 yıl"
                />
              </div>
            </div>
          </div>

          {/* Water Parameters Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Su Değerleri</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>

          {/* Colors Section */}
          <div className="bg-pink-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Renk Çeşitleri</h5>
            <div className="grid grid-cols-1 gap-4">
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
            </div>
          </div>
        </div>
      )}

      {/* Plant-specific fields */}
      {formData.category === 'plants' && (
        <div className="space-y-6 border-t pt-6">
          <h4 className="font-semibold text-gray-800">Bitki Özellikleri</h4>
          
          {/* Quick Info Section */}
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Hızlı Bilgiler</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boyut
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.size}
                  onChange={(e) => handleQuickInfoChange('size', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="5-10 cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tip
                </label>
                <input
                  type="text"
                  value={formData.quickInfo.temperament}
                  onChange={(e) => handleQuickInfoChange('temperament', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Yosun, Rhizome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bakım Seviyesi
                </label>
                <select
                  value={formData.quickInfo.careLevel}
                  onChange={(e) => handleQuickInfoChange('careLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="Çok Kolay">Çok Kolay</option>
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                  <option value="Zor">Zor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Care Info Section */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Bakım Bilgileri</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menşei
                </label>
                <input
                  type="text"
                  value={formData.careInfo.origin}
                  onChange={(e) => handleCareInfoChange('origin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Güneydoğu Asya"
                />
              </div>
            </div>
          </div>
          
          {/* Plant Care Section */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">Bakım Bilgileri</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Işık İhtiyacı
                </label>
                <select
                  value={formData.lightRequirement}
                  onChange={(e) => handleInputChange('lightRequirement', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="Düşük">Düşük</option>
                  <option value="Düşük-Orta">Düşük-Orta</option>
                  <option value="Orta">Orta</option>
                  <option value="Orta-Yüksek">Orta-Yüksek</option>
                  <option value="Yüksek">Yüksek</option>
                  <option value="Çok Yüksek">Çok Yüksek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CO2 İhtiyacı
                </label>
                <select
                  value={formData.co2Requirement}
                  onChange={(e) => handleInputChange('co2Requirement', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="Gerekli değil">Gerekli değil</option>
                  <option value="Opsiyonel">Opsiyonel</option>
                  <option value="Düşük">Düşük</option>
                  <option value="Orta">Orta</option>
                  <option value="Yüksek">Yüksek</option>
                  <option value="Çok Yüksek">Çok Yüksek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Büyüme Hızı
                </label>
                <select
                  value={formData.growthRate}
                  onChange={(e) => handleInputChange('growthRate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="Çok Yavaş">Çok Yavaş</option>
                  <option value="Yavaş">Yavaş</option>
                  <option value="Yavaş-Orta">Yavaş-Orta</option>
                  <option value="Orta">Orta</option>
                  <option value="Orta-Hızlı">Orta-Hızlı</option>
                  <option value="Hızlı">Hızlı</option>
                  <option value="Çok Hızlı">Çok Hızlı</option>
                </select>
              </div>

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

// Guide Editor Component - Kept for potential future use
// interface GuideEditorProps {
//   section: string;
//   onSave: (content: string) => void;
//   onCancel: () => void;
// }

// const GuideEditor: React.FC<GuideEditorProps> = ({ section, onSave, onCancel }) => {
//   const [content, setContent] = useState('');

//   const sectionTitles: { [key: string]: string } = {
//     'neocaridina': 'Neocaridina Bakımı',
//     'tank-setup': 'Tank Kurulumu',
//     'water-params': 'Su Parametreleri',
//     'breeding': 'Üretim Rehberi',
//     'feeding': 'Beslenme',
//     'tank-mates': 'Tank Arkadaşları'
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(content);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           {sectionTitles[section]} İçeriği
//         </label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows={20}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//           placeholder={`${sectionTitles[section]} içeriğini buraya yazın...`}
//         />
//       </div>

//       <div className="flex gap-4 pt-6">
//         <button
//           type="submit"
//           className="btn-primary"
//         >
//           Kaydet
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="btn-outline"
//         >
//           İptal
//         </button>
//       </div>
//     </form>
//   );
// };

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
    category: slide?.category || 'fish',
    badge: slide?.badge || '',
    discountTag: slide?.discountTag || '',
    price: slide?.price || '',
    oldPrice: slide?.oldPrice || ''
  });

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Eğer resim yükleniyorsa bekle
    if (uploading) {
      alert('Lütfen resim yüklenmesini bekleyin...');
      return;
    }
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Lütfen sadece resim dosyası seçin.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Storage'da dosya yolu: sliders/timestamp-filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const storageRef = ref(storage, `sliders/${fileName}`);

      // Yükleme işlemini başlat
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Progress takibi ve URL alma
      const downloadURL = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            reject(new Error(`${file.name} yüklenirken hata oluştu: ${error.message}`));
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            } catch (error) {
              reject(new Error(`${file.name} için URL alınırken hata oluştu`));
            }
          }
        );
      });

      // URL'i form data'ya ekle
      handleInputChange('image', downloadURL);
      setUploadProgress(100);
      
      // Input'u temizle
      if (e.target) {
        e.target.value = '';
      }
    } catch (error: any) {
      alert(error.message || 'Resim yüklenirken bir hata oluştu.');
      console.error('Slider resim yükleme hatası:', error);
    } finally {
      setUploading(false);
      // Progress'i bir süre sonra temizle
      setTimeout(() => setUploadProgress(0), 2000);
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
            <option value="accessories">Sağlık & Bakım</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buton Metni (Opsiyonel)
          </label>
          <input
            type="text"
            value={formData.buttonText}
            onChange={(e) => handleInputChange('buttonText', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Örn: İndirimi Kaçırma"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buton Linki (Opsiyonel)
          </label>
          <input
            type="text"
            value={formData.buttonLink}
            onChange={(e) => handleInputChange('buttonLink', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Örn: /category/shrimp veya /product/12"
          />
        </div>
      </div>

      {/* Special Offer & Discount Fields */}
      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-4">
        <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          🔥 Kampanya & Özel Fiyat Ayarları (Opsiyonel)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Kampanya / Üst Rozet (Badge)
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => handleInputChange('badge', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
              placeholder="Örn: YENİ ÜRÜN veya FIRSAT ÜRÜNÜ"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              İndirim Oranı Etiketi
            </label>
            <input
              type="text"
              value={formData.discountTag}
              onChange={(e) => handleInputChange('discountTag', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
              placeholder="Örn: %20 İNDİRİM veya SINIRLI STOK"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Kampanyalı Fiyat (TL)
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white font-bold text-emerald-700"
              placeholder="Örn: 249 TL"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Eski Fiyat (TL)
            </label>
            <input
              type="text"
              value={formData.oldPrice}
              onChange={(e) => handleInputChange('oldPrice', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white text-gray-400 line-through"
              placeholder="Örn: 350 TL"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resim
        </label>
        <div className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
              id="slider-image-upload"
            />
            <label
              htmlFor="slider-image-upload"
              className={`cursor-pointer flex flex-col items-center gap-2 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="text-4xl">{uploading ? '⏳' : '📁'}</div>
              <div className="text-sm font-medium text-gray-700">
                {uploading ? 'Yükleniyor...' : 'Resim Dosyası Seç'}
              </div>
              <div className="text-xs text-gray-500">
                JPG, PNG, GIF (Firebase Storage'a yüklenecek)
              </div>
            </label>
          </div>

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Yükleniyor...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya</span>
            </div>
          </div>

          {/* URL Input */}
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            placeholder="Resim URL'si girin (örn: https://example.com/image.jpg)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          {/* Image Preview */}
          {formData.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Önizleme:</p>
              <img
                src={formData.image}
                alt="Önizleme"
                className="w-full h-48 object-cover rounded-lg border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  alert('Resim yüklenemedi. Lütfen geçerli bir URL girin veya dosya yükleyin.');
                }}
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
