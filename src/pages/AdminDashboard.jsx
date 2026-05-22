import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { productData, addProduct, removeProduct, editProduct } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('panels');

  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormError, setEditFormError] = useState('');
  const [editFormSuccess, setEditFormSuccess] = useState('');

  // Global action feedback banner
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Per-button loading states
  const [addingProduct, setAddingProduct] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const showActionError = (msg) => {
    setActionError(msg);
    setTimeout(() => setActionError(''), 4000);
  };

  const categories = [
    { id: 'panels', label: 'Solar Panels' },
    { id: 'inverters', label: 'Inverters' },
    { id: 'batteries', label: 'Batteries' },
    { id: 'lights', label: 'Solar Lights' },
    { id: 'stabilizers', label: 'Stabilizers' },
    { id: 'products', label: 'All Products (Featured)' },
  ];

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    badge: '',
    description: '',
    spec1Label: '',
    spec1Value: '',
    spec2Label: '',
    spec2Value: '',
    image: '',
    price: ''
  });

  const [formError, setFormError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.id || !formData.name || !formData.price || !formData.image) {
      setFormError('ID, Name, Image URL, and Price are required.');
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum)) {
      setFormError('Price must be a valid number.');
      return;
    }

    const newProduct = {
      ...formData,
      price: priceNum,
      category: activeCategory
    };

    setAddingProduct(true);
    const { error } = await addProduct(activeCategory, newProduct);
    setAddingProduct(false);

    if (error) {
      showActionError('Action failed. Please check your connection and try again.');
      return;
    }

    setFormData({
      id: '',
      name: '',
      badge: '',
      description: '',
      spec1Label: '',
      spec1Value: '',
      spec2Label: '',
      spec2Value: '',
      image: '',
      price: ''
    });
    setActionSuccess('Product added successfully.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleRemoveClick = async (productId) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct(null);
    }
    setRemovingId(productId);
    const { error } = await removeProduct(activeCategory, productId);
    setRemovingId(null);

    if (error) {
      showActionError('Action failed. Please check your connection and try again.');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct({ ...product, originalCategory: activeCategory, category: activeCategory });
    setEditFormError('');
    setEditFormSuccess('');
  };

  const handleEditChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditFormError('');
    setEditFormSuccess('');

    if (!editingProduct.name || !editingProduct.price || !editingProduct.image || !editingProduct.description) {
      setEditFormError('Name, Description, Image URL, and Price are required.');
      return;
    }

    const priceNum = parseFloat(editingProduct.price);
    if (isNaN(priceNum)) {
      setEditFormError('Price must be a valid number.');
      return;
    }

    const { originalCategory, category, ...updatedProduct } = editingProduct;
    updatedProduct.price = priceNum;
    updatedProduct.category = category;

    setSavingEdit(true);
    let error = null;

    if (originalCategory !== category) {
      const removeResult = await removeProduct(originalCategory, updatedProduct.id);
      if (!removeResult.error) {
        const addResult = await addProduct(category, updatedProduct);
        error = addResult.error;
      } else {
        error = removeResult.error;
      }
    } else {
      const result = await editProduct(originalCategory, updatedProduct.id, updatedProduct);
      error = result.error;
    }

    setSavingEdit(false);

    if (error) {
      setEditFormError('Save failed. Please check your connection and try again.');
      return;
    }

    setEditFormSuccess('Changes saved.');
    setTimeout(() => {
      setEditingProduct(null);
      setEditFormSuccess('');
    }, 1500);
  };

  const handleCategorySwitch = (catId) => {
    setEditingProduct(null);
    setActiveCategory(catId);
  };

  const currentProducts = productData[activeCategory] || [];

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight uppercase">Admin Console</h1>
          <p className="font-label text-primary tracking-widest text-sm mt-2 uppercase">System Overview &amp; Inventory Control</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-outline-variant text-on-surface font-bold rounded hover:bg-surface-container-high transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Global feedback banners */}
      {actionError && (
        <div className="max-w-7xl mx-auto w-full mb-4 p-4 bg-error/10 border border-error/30 rounded-lg text-error text-sm font-bold flex items-center gap-3">
          <span className="material-symbols-outlined text-sm">error</span>
          {actionError}
        </div>
      )}
      {actionSuccess && (
        <div className="max-w-7xl mx-auto w-full mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-bold flex items-center gap-3">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {actionSuccess}
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
          <h2 className="font-label text-neutral-500 uppercase tracking-widest text-xs mb-4">Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              className={`text-left px-4 py-3 rounded-lg font-bold transition-colors ${activeCategory === cat.id ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Inventory Table */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20">
            <h2 className="font-headline text-2xl font-bold tracking-tight mb-6 flex justify-between items-center">
              <span>{categories.find(c => c.id === activeCategory)?.label} Inventory</span>
              <span className="text-sm font-label text-primary bg-primary/10 px-3 py-1 rounded-full">{currentProducts.length} Items</span>
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="py-4 px-4 font-label text-xs uppercase text-neutral-500 tracking-wider">Image</th>
                    <th className="py-4 px-4 font-label text-xs uppercase text-neutral-500 tracking-wider">Details</th>
                    <th className="py-4 px-4 font-label text-xs uppercase text-neutral-500 tracking-wider">Price</th>
                    <th className="py-4 px-4 font-label text-xs uppercase text-neutral-500 tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-on-surface-variant font-body">No products found in this category.</td>
                    </tr>
                  ) : (
                    currentProducts.map(product => (
                      <tr key={product.id} className="border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors group">
                        <td className="py-4 px-4">
                          <div className="w-16 h-16 rounded bg-surface-container-low overflow-hidden p-1 border border-outline-variant/10">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold font-headline">{product.name}</div>
                          <div className="text-xs text-neutral-500 mt-1">ID: {product.id} | {product.badge}</div>
                        </td>
                        <td className="py-4 px-4 font-bold text-warm-white">
                          ₦ {new Intl.NumberFormat().format(product.price)}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="text-primary hover:bg-primary/10 p-2 rounded transition-colors mr-2"
                            title="Edit Product"
                          >
                            <span className="material-symbols-outlined text-sm font-bold">edit</span>
                          </button>
                          <button
                            onClick={() => handleRemoveClick(product.id)}
                            disabled={removingId === product.id}
                            className="text-error hover:bg-error/10 p-2 rounded transition-colors disabled:opacity-40"
                            title="Remove Product"
                          >
                            {removingId === product.id
                              ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                              : <span className="material-symbols-outlined text-sm">delete</span>
                            }
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inline Edit Panel */}
          {editingProduct && (
            <div className="bg-surface-container rounded-xl p-6 border border-primary/40 shadow-lg shadow-primary/5 relative">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-headline text-2xl font-bold tracking-tight text-white">{editingProduct.name}</h2>
                <span className="font-label text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-widest font-bold border border-primary/20">Editing</span>
              </div>
              
              {editFormError && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded text-error text-sm font-bold">
                  {editFormError}
                </div>
              )}

              {editFormSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-sm font-bold">
                  {editFormSuccess}
                </div>
              )}
              
              <form onSubmit={handleSaveEdit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Product ID (Read-only)</label>
                  <div className="w-full bg-surface-container-highest border border-outline-variant/10 rounded p-3 text-neutral-400 font-mono text-sm cursor-not-allowed">
                    {editingProduct.id}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Category</label>
                  <select
                    name="category"
                    value={editingProduct.category}
                    onChange={handleEditChange}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Name *</label>
                  <input type="text" name="name" value={editingProduct.name} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Price (₦) *</label>
                  <input type="number" name="price" value={editingProduct.price} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>
                
                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Badge / Tag</label>
                  <input type="text" name="badge" value={editingProduct.badge} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Description *</label>
                  <textarea name="description" value={editingProduct.description} onChange={handleEditChange} rows="3" className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 1 Label</label>
                  <input type="text" name="spec1Label" value={editingProduct.spec1Label || ''} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 1 Value</label>
                  <input type="text" name="spec1Value" value={editingProduct.spec1Value || ''} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 2 Label</label>
                  <input type="text" name="spec2Label" value={editingProduct.spec2Label || ''} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 2 Value</label>
                  <input type="text" name="spec2Value" value={editingProduct.spec2Value || ''} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Image URL *</label>
                  <input type="text" name="image" value={editingProduct.image} onChange={handleEditChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors mb-4" />
                  <div className="w-full h-40 bg-surface-container-highest border border-outline-variant/20 rounded flex items-center justify-center overflow-hidden">
                    {editingProduct.image ? (
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div className="text-neutral-500 font-label text-xs uppercase" style={{ display: editingProduct.image ? 'none' : 'flex' }}>
                      Image Placeholder
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 mt-4 flex gap-4">
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="flex-1 py-4 bg-primary text-on-primary font-bold rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {savingEdit
                      ? <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> Saving...</>
                      : 'Save Changes'
                    }
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 py-4 bg-transparent border border-outline-variant text-white font-bold rounded hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add Product Form */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20">
            <h2 className="font-headline text-2xl font-bold tracking-tight mb-6">Add New Product</h2>
            
            {formError && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded text-error text-sm font-bold">
                {formError}
              </div>
            )}
            
            <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Product ID *</label>
                <input type="text" name="id" value={formData.id} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., panel-100" />
              </div>
              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., Mono Panel 500W" />
              </div>
              
              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Price (₦) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., 150000" />
              </div>
              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Badge / Tag</label>
                <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., Premium, Best Seller" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Image URL *</label>
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="https://..." />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="Detailed product description..." />
              </div>

              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 1 Label</label>
                <input type="text" name="spec1Label" value={formData.spec1Label} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., Efficiency" />
              </div>
              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 1 Value</label>
                <input type="text" name="spec1Value" value={formData.spec1Value} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., 22.5%" />
              </div>

              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 2 Label</label>
                <input type="text" name="spec2Label" value={formData.spec2Label} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., Warranty" />
              </div>
              <div>
                <label className="block text-xs font-label uppercase text-neutral-500 mb-2">Spec 2 Value</label>
                <input type="text" name="spec2Value" value={formData.spec2Value} onChange={handleInputChange} className="w-full bg-surface-container-low border border-outline-variant/30 rounded p-3 text-on-surface focus:border-primary outline-none transition-colors" placeholder="e.g., 10 Years" />
              </div>

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={addingProduct}
                  className="w-full py-4 bg-primary text-on-primary font-bold rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {addingProduct
                    ? <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> Adding...</>
                    : <><span className="material-symbols-outlined">add_circle</span> Add Product to {categories.find(c => c.id === activeCategory)?.label}</>
                  }
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
