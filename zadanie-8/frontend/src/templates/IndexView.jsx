import {useEffect, useState} from 'react'
import {Navigation, Products, Alert} from '../components';
import axios from "axios";

const IndexView = () => {
    const [products, setProducts] = useState([]);
    const [success, setSuccess] = useState(false);
    const cartID = 1;

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:8000/api/products`);
            setProducts(data);
        })();
        if (setSuccess) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [setSuccess]);

    const addToCart = async (productID) => {
        try {
            const response = await axios.post('http://localhost:8000/api/cart/add-to-cart', {
                product_id: productID,
                product_count: 1,
                cart_id: cartID
            });
            if (response.status === 200) {
                setSuccess(true)
            }
        } catch (error) {
            alert('Błąd podczas dodawania produktu do koszyka.');
        }
    }

    return (
        <>
            <Navigation />
            <Products products = {products} addToCart = {addToCart} />
            { success ?
            <Alert message="Produkt został dodany do koszyka!" />
            : ''}
        </>
    );
};

export default IndexView;
