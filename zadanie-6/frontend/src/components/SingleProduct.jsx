import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1650px;
`

const SingleProductInner = styled.div`
    display: grid;
    margin: 3.5rem auto 0;
    grid-template-columns: 1fr 1fr;
    max-width: 1250px;
    min-height: 650px;
    background-color: #232631;
`

const SingleProductInfo = styled.div`
    padding: 3rem;
`

const SingleProductInfoTitle = styled.span`
    display: block;
    margin-bottom: 2rem;
    font-size:2rem;
    font-weight: 500;
`

const SingleProductInfoPrice = styled.span`
    display: block;
    font-size:2rem;
    font-weight: 500;
`

const SingleProductArtwork = styled.div`
    padding: 3rem;
`

const SingleProductItemImg = styled.img`
    max-width: 100%;
    height: auto;
`

const SingleProduct = (props) => {
    return (
        <Container>
            <SingleProductInner data-cy="single-product">
                <SingleProductInfo>
                    <SingleProductInfoTitle data-cy="product-name">{props.product.Name}</SingleProductInfoTitle>

                    <SingleProductInfoPrice data-cy="product-price">{props.product.Price} zł</SingleProductInfoPrice>
                </SingleProductInfo>

                <SingleProductArtwork>
                    <SingleProductItemImg data-cy="product-img" src={`.${props.product.Image}`} alt={`${props.product.Name}`} />
                </SingleProductArtwork>
            </SingleProductInner>
        </Container>
    );
};

export default SingleProduct;