
import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";

function ModalComponent({ show, handleClose, addSelectedProducts, selectedProducts }) {
  const [catalogue, setCatalogue] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('all');

  const filteredCatalogue = catalogue.filter(c => search === 'all' || c.title.toUpperCase().startsWith(search.toUpperCase()));

  useEffect(() => {
    async function ProductApi() {
      const response = await fetch("/task/products/search?page=${page}&limit=10", {
        headers: {
          "x-api-key": "72njgfa948d9aS7gs5",
        },
      });
      const res = await response.json();
      setCatalogue(res);
    }
    ProductApi();
  }, [page]);

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  const handleProductSelect = (product, variant) => {
    let updatedSelectedProducts;
    if (selectedProducts.find(item => item.id === product.id)) {
      updatedSelectedProducts = selectedProducts.filter(item => item.id !== product.id);
    } else {
      updatedSelectedProducts = [...selectedProducts, { ...product, variant }];
    }
    addSelectedProducts(updatedSelectedProducts);
  };

  return (
    <div className='w-100'>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input className='p-2 bg-light text-dark w-100 form-control mb-5' type="text" onChange={handleFilter} placeholder="Search" />
          </div>
          {
            filteredCatalogue.map(c => (
              <div key={c.id}>
                <div className="d-flex align-items-center">
                  <input
                    className="form-check-input me-3"
                    type="checkbox"
                    checked={selectedProducts.some(item => item.id === c.id)}
                    onChange={() => handleProductSelect(c)}
                  />
                  <img src={c.image?.src} alt="" style={{ width: 50, height: 50 }} />
                  <p className='ms-3'>{c.title}</p>
                </div>
                <hr className='solid' />
                <div className='ms-5'>
                  {
                    c.variants.map(v => (
                      <div key={v.id}>
                        <div className="d-flex">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => handleProductSelect(c, v)}
                          />
                          <p className='ms-3'>{v.title}</p>
                          <p className='ms-auto'>Rs {v.price}</p>
                        </div>
                        <hr className='solid ms-nt5' />
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent