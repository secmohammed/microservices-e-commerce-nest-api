import StripeCheckout from "react-stripe-checkout";

export const checkout = () => {
    return (
        <StripeCheckout
            token={token => {
                console.log(token);
                // const response = await mutate({
                //   variables: { source: token.id, ccLast4: token.card.last4 }
                // });
                // console.log(response);
            }}
            stripeKey="pk_test_aIuqxcFC1ODFbiKmvbyPlNnl"
            amount={1000}
        />
    );
};
export default checkout;
