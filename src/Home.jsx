import React, { useState } from 'react';
import ModalComponent from './ModalComponent';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([{ id: 1, disbtn: false, selectedProducts: [] }]);
  const [currentProductId, setCurrentProductId] = useState(null); 
  const [variant, setVariant] = useState(false)
  const [visibleVariants, setVisibleVariants] = useState({});


  function handleModal(productId) {
    setShowModal(!showModal);
    setCurrentProductId(productId); 
  }

  function handleDiscount(productId) {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, disbtn: true } : product
    ));
  }

  function handleAddProduct() {
    const newProduct = { id: products.length + 1, disbtn: false, selectedProducts: [] };
    setProducts([...products, newProduct]);
  }

  const addSelectedProducts = (productId, newSelectedProducts) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, selectedProducts: newSelectedProducts } : product
    ));
  };

  const handleVariantToggle = (productId) => {
    setVisibleVariants((prev) => ({
      ...prev,
      [productId]: !prev[productId], 
    }));
  };

  return (
    <>
      <div className='d-flex justify-content-center bg-light text-dark' style={{ height: '100%' }}>
        <div className='p-4 w-50 bg-white border border-light'>
          <input className='p-2 bg-light text-dark w-100 form-control' type="text" placeholder="Search" />
          <div className='mt-4 p-2 bg-white text-dark'>
            Video-reviews
          </div>
          <hr />
          <div className='mt-4 d-flex justify-content-between'>
            <h1>Offer Funnel Tunnels</h1>
            <span className='mt-3'>Support/Talk to an Expert</span>
          </div>
          <hr />
          <div className='mt-4'>
            <h4>Add Bundle Products (Max. 4 products)</h4>
            <div>
              <span>Offer Bundle will be shown to the customer whenever any of the bundle products are added to the cart.</span>
            </div>
          </div>
          <ol>
            {products.map((product) => (
              <li key={product.id}>
                <div className='mt-4 d-flex'>
                  <div className="input-group w-50 me-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={product.selectedProducts.length ? product.selectedProducts.map(p => p.title).join(', ') : "Select Product"}
                      aria-label="Select Product"
                      readOnly
                    />
                    <span className="input-group-text" onClick={() => handleModal(product.id)}>
                      <i className="bi bi-pencil-fill"></i>
                    </span>

                    {currentProductId === product.id && (
                      <ModalComponent
                        show={showModal}
                        handleClose={() => handleModal(product.id)}
                        addSelectedProducts={(newSelectedProducts) => addSelectedProducts(product.id, newSelectedProducts)}
                        selectedProducts={product.selectedProducts}
                      />
                    )}
                  </div>

                  {product.disbtn ? (
                    <div className='d-flex justify-content-between'>
                      <input className="me-3" type="text" />
                      <select>
                        <option value="off">% off</option>
                        <option value="flat off">% flat off</option>
                      </select>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success px-4"
                      onClick={() => handleDiscount(product.id)}
                    >
                      Add Discount
                    </button>
                  )}
                </div>

                {product.selectedProducts.map((o) => (
                  <div key={o.id}>
                    {o.variants && o.variants.length > 0 ? (
                      <button
                        className='btn bg-white text-primary border-0'
                        onClick={() => handleVariantToggle(o.id)}
                      >
                        {visibleVariants[o.id] ? 'Hide Variants' : 'Show Variants'}
                      </button>
                    ) : null}

                    {o.variant ? (
                      <div className='d-flex flex-column gap-3'>
                        <input
                          key={o.variant.id}
                          type="text"
                          value={o.variant.title}
                          readOnly
                          className="form-control rounded w-50"
                        />
                      </div>
                    ) : null}

                    {visibleVariants[o.id] && !o.variant && (
                      <div className='d-flex flex-column gap-3'>
                        {o.variants.map((u) => (
                          <input
                            key={u.id}
                            type="text"
                            value={u.title}
                            readOnly
                            className="form-control rounded w-50"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ol>
          <div className='mt-4 me-3'>
            <button type="button" className=" px-5 btn btn-outline-success float-end" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;