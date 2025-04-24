import { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const tableNumber = new URLSearchParams(window.location.search).get('table'); // From QR

    useEffect(() => {
        axios.get('http://localhost:5000/api/customer/menu')
            .then(res => setMenuItems(res.data))
            .catch(err => console.error(err));
    }, []);

    const addToCart = (item) => setCart([...cart, item]);

    const placeOrder = () => {
        axios.post('http://localhost:5000/api/customer/order', { table_number: tableNumber, items: cart })
            .then(() => alert('Order placed!'))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Menu (Table {tableNumber})</h1>
            {menuItems.map(item => (
                <div key={item.id}>
                    <h3>{item.name} - ${item.price}</h3>
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
            ))}
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
};

export default Menu;