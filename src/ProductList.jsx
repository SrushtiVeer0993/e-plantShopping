import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the room.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to grow and clean air.", cost: "$22" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/36/aloe-3284534_1280.jpg", description: "Soothes skin and purifies air.", cost: "$10" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/lavender-829555_1280.jpg", description: "Calming scent.", cost: "$15" },
                { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2016/08/10/18/43/jasmine-1583856_1280.jpg", description: "Sweet fragrance.", cost: "$18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Aromatic herb.", cost: "$12" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/27/18/24/mint-1165038_1280.jpg", description: "Refreshing aroma.", cost: "$10" },
                { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/01/25/11/22/eucalyptus-3105991_1280.jpg", description: "Clean medicinal scent.", cost: "$16" },
                { name: "Gardenia", image: "https://cdn.pixabay.com/photo/2017/05/18/18/31/gardenia-2324395_1280.jpg", description: "Intense white floral scent.", cost: "$24" }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="tag">
                    <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
                </div>
                <div>
                    <a href="#cart" onClick={(e) => handleCartClick(e)} style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                        Cart 🛒 <span className="cart_quantity_count">{totalQuantity}</span>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>{category.category}</h1>
                            <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '250px', textAlign: 'center' }}>
                                        <img src={plant.image} alt={plant.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p><strong>{plant.cost}</strong></p>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name] || cart.some(item => item.name === plant.name)}
                                            style={{ backgroundColor: (addedToCart[plant.name] || cart.some(item => item.name === plant.name)) ? '#grey' : '#4CAF50', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}
                                        >
                                            {(addedToCart[plant.name] || cart.some(item => item.name === plant.name)) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
