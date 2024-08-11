
import {Navigation, SingleProduct} from '../components';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching product data', error);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (product) {
            document.title = `Produkt - ${product.Name}`;
        }
    }, [product]);

    return (
        <>
            <Navigation />
            {product ? (
            <SingleProduct product = {product} />
            ) : ''}
        </>
    );
};

export default ProductView;
