import styled from "styled-components";
import {AddCartBtn} from '../components';

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1650px;
`
const ProductHeader = styled.header`
    display: block;
    padding: 3.5rem 0 1.5rem;
    min-width: 100%;
    text-align: center;
`
const ProductHeaderTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
`
const ProductsInner = styled.div`
    min-width: 100%;
`
const ProductsBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    grid-row-gap: 2rem;
    grid-column-gap: 4rem;
`
const ProductsBoxItem = styled.div`
    display: block;
    padding: 1rem;
    position: relative;
    min-height: 330px;
    min-width: 100%;
    background-color: #232631;
    text-decoration: none;
    border: 1px solid transparent;
    transition: 0.2s ease-in-out;
    color:#fff;
    z-index:0;
    
    &:hover{
        border: 1px solid #338AFF;
    }
`
const ProductsBoxItemWrapper = styled.a`
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    color:#fff;

    &:hover{
        color:#fff;
    }
`

const ProductsBoxItemArtwork = styled.div`
    display: block;
    margin: 1rem auto 0.5rem;
    max-width: 250px;
    height: auto;
`
const ProductsBoxItemImg = styled.img`
    max-width: 100%;
    height: auto;
`

const ProductsBoxItemName = styled.span`
    display: inline-block;
    height: 1px;
    margin-left: 1rem;
    margin-top: 1rem;
    font-weight: 500;
    font-size: 1.25rem;
`

const ProductsBoxItemPrice = styled.span`
    display: block;
    height: 1px;
    position: absolute;
    left:1rem;
    bottom:3.5rem;
    font-weight: 700;
    font-size: 1.55rem;
    color:#FFD700;
`

const ProductsNotFound = styled.div`
    text-align: center;
    min-width: 100%;
`
const ProductsNotFoundTitle = styled.h2`
    min-width: 100%;
`

const Products = (props) => {
    return (
        <Container>
            <ProductHeader>
                <ProductHeaderTitle>Polecane produkty</ProductHeaderTitle>
            </ProductHeader>

            <ProductsInner>
                {props.products.length > 0 ?
                    <ProductsBox data-cy="products-box">
                        {props.products.map(product =>
                            <ProductsBoxItem key={product.ID} data-cy="product-item">
                                <ProductsBoxItemWrapper href={`/product/${product.ID}`}>
                                    <ProductsBoxItemArtwork>
                                        <ProductsBoxItemImg data-cy="product-img" src={`${product.Image}`} alt={`${product.Name}`}/>
                                    </ProductsBoxItemArtwork>
                                    <ProductsBoxItemName data-cy="product-name">{product.Name}</ProductsBoxItemName>
                                    <ProductsBoxItemPrice
                                        data-cy="product-price">{product.Price} zł</ProductsBoxItemPrice>
                                </ProductsBoxItemWrapper>

                                <AddCartBtn addToCart={props.addToCart} id={product.ID}></AddCartBtn>
                            </ProductsBoxItem>)
                        }
                    </ProductsBox> :

                    <ProductsNotFound data-cy="products-not-found">
                        <ProductsNotFoundTitle>Brak dostępnych produktów.</ProductsNotFoundTitle>
                    </ProductsNotFound>
                }
            </ProductsInner>
        </Container>
    );
};

export default Products;