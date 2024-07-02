import {useEffect, useState} from 'react'
import {Navigation,Cart,Alert} from '../components';
import axios from "axios";

const CartView = () => {
    const [cart, getCart] = useState([]);
    const [success, getSuccess] = useState(false);
    const cartID = 1;

    const fetchCart = async () => {
        const { data } = await axios.get('http://localhost:8000/api/carts/1');
        getCart(data);
    };

    useEffect(() => {
        fetchCart();
        if (success) {
            const timer = setTimeout(() => {
                getSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const makePayment = async (totalAmount) => {
        try {
            const response = await axios.post('http://localhost:8000/api/cart/make-payment', {
                cart_id: cartID,
                total_amount: totalAmount
            });
            if (response.status === 200) {
                getSuccess(true);
                fetchCart();
            }
        } catch (error) {
            alert('Wystąpił błąd przy dokonywaniu płatności!');
        }
    };

    return (
        <>
            <Navigation />
            <Cart cart = {cart} makePayment={makePayment} />
            { success ?
                <Alert message="Płatność została poprawnie dokonana!" />
                : ''}
        </>
    );
};

export default CartView;
