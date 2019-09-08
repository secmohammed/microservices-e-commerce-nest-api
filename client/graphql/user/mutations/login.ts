import { gql } from "apollo-boost";

export default gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            id
            token
        }
    }
`;
