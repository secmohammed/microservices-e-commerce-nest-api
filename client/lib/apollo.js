import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
    link: new HttpLink({
        uri: "http://localhost:8000/graphql",
        opts: {
            credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
        }
    })
};

export default withData(config);
