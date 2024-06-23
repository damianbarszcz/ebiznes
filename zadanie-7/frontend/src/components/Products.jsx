import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1800px;
`
const ProductHeader = styled.header`
    display: block;
    padding: 3.5rem 0;
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
    grid-row-gap: 3rem;
    grid-column-gap: 4rem;
`
const ProductsBoxItem = styled.div`
    padding: 1rem;
    position: relative;
    min-height: 285px;
    min-width: 100%;
    background-color: #232631;
`
const ProductsBoxItemWrapper = styled.div`
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
`

const ProductsBoxItemName = styled.span`
    display: block;
    margin-left: 1rem;
    margin-top: 1rem;
    font-weight: 500;
    font-size: 2rem;
`
const ProductsBoxItemPrice = styled.span`
    display: block;
    position: absolute;
    right:1rem;
    bottom:1rem;
    font-weight: 500;
    font-size: 1.85rem;
    color:#FFD700;
`

const ProductsBoxItemAddToCart = styled.button`
    display: block;
    position: absolute;
    left:1rem;
    bottom:1rem;
    font-weight: 500;
    font-size: 1rem;
    color:#fff;
    background-color: transparent;
    border: 1px solid #DB1F48;
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
                    <ProductsBox>
                        {props.products.map(product =>
                            <ProductsBoxItem key={product.ID}>
                                <ProductsBoxItemWrapper>
                                <ProductsBoxItemName>{product.Name}</ProductsBoxItemName>
                                <ProductsBoxItemPrice>{product.Price} zł</ProductsBoxItemPrice>
                                <ProductsBoxItemAddToCart onClick={() => props.addToCart(product.ID)}>Dodaj do koszyka</ProductsBoxItemAddToCart>
                                </ProductsBoxItemWrapper>
                            </ProductsBoxItem>
                        )
                        }
                    </ProductsBox> :

                    <ProductsNotFound>
                        <ProductsNotFoundTitle>Brak dostępnych produktów.</ProductsNotFoundTitle>
                    </ProductsNotFound>
                }
            </ProductsInner>
        </Container>
    );
};

export default Products;