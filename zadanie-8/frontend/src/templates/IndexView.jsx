import {useEffect, useState} from 'react'
import {Navigation, Products, Alert} from '../components';
import axios from "axios";

const IndexView = () => {
    const [products, getProducts] = useState([]);
    const [success, getSuccess] = useState(false);
    const cartID = 1;

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:8000/api/products`);
            getProducts(data);
        })();
        if (getSuccess) {
            const timer = setTimeout(() => {
                getSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [getSuccess]);

    const addToCart = async (productID) => {
        try {
            const response = await axios.post('http://localhost:8000/api/cart/add-to-cart', {
                product_id: productID,
                product_count: 1,
                cart_id: cartID
            });
            if (response.status === 200) {
                getSuccess(true)
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
