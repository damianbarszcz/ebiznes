import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1800px;
`
const CartHeader = styled.header`
    display: block;
    padding: 3.5rem 0;
    min-width: 100%;
    text-align: center;
`
const CartHeaderTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
`
const  CartInner = styled.div`
    margin:auto;
    width: 100%;
    max-width: 700px;
`
const CartBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
`
const CartBoxItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: relative;
    min-height: 45px;
    width: 100%;
    background-color: #232631;
`
const CartBoxItemName = styled.div`
    margin-left: 2rem;
    font-weight: 500;
    font-size: 1.25rem;
`
const CartBoxItemDetails = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2rem;
    font-weight: 500;
    font-size: 1.25rem;
`
const CartBoxItemPrice = styled.span`
    display: block;
    font-weight: 500;
    font-size: 1.25rem;
`
const CartBoxItemCount = styled.span`
    display: block;
    margin-left: 1rem;
    padding: 0.25rem 0.75rem;
    border: 2px solid #181B20;
    font-weight: 500;
    font-size: 1.25rem;
`
const CartNotFound = styled.div`
    text-align: center;
    min-width: 100%;
`
const CartNotFoundTitle = styled.h2`
    min-width: 100%;
`
const CartBoxProductBuy = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:2rem;
`
const CartBoxProductBuyPrice = styled.div`
    display: block;
`
const CartBoxProductBuyPriceCaption = styled.div`
    font-size: 1.5rem;
`
const CartBoxProductBuyBtn = styled.button`
    display: inline-block;
    padding: 0.85rem 2.35rem;
    background-color: transparent;
    border: 1px solid #DB1F48;
`
const CartBoxProductBuyBtnCaption = styled.span`
    font-weight: 500;
    font-size: 1rem;
    color:#ffffff;
`
const Cart = (props) => {
    let totalAmount = 0;

    if(props.cart !== null){
        totalAmount = props.cart.reduce((total, product) => {
            return total + product.product_price * product.product_count;
        }, 0);
    }

    return (
        <Container>
            <CartHeader>
                <CartHeaderTitle>Mój koszyk</CartHeaderTitle>
            </CartHeader>

            <CartInner>
                {props.cart !== null  ?
                    <CartBox>
                        {props.cart.map(product =>
                            <CartBoxItem key={product.ProductID}>
                                <CartBoxItemName>{product.product_name}</CartBoxItemName>

                                <CartBoxItemDetails>
                                    <CartBoxItemPrice>{product.product_price} zł</CartBoxItemPrice>
                                    <CartBoxItemCount>{product.product_count}</CartBoxItemCount>
                                </CartBoxItemDetails>
                            </CartBoxItem>
                        )}

                        <CartBoxProductBuy>
                            <CartBoxProductBuyPrice>
                                <CartBoxProductBuyPriceCaption>
                                    Łączna kwota: <strong>{totalAmount} zł</strong>
                                </CartBoxProductBuyPriceCaption>
                            </CartBoxProductBuyPrice>

                            <CartBoxProductBuyBtn>
                                <CartBoxProductBuyBtnCaption onClick={() => props.makePayment(totalAmount)}>Zapłać</CartBoxProductBuyBtnCaption>
                            </CartBoxProductBuyBtn>
                        </CartBoxProductBuy>
                    </CartBox> :

                    <CartNotFound>
                        <CartNotFoundTitle>Twój koszyk jest pusty.</CartNotFoundTitle>
                    </CartNotFound>
                }
            </CartInner>
        </Container>
    );
};

export default Cart;