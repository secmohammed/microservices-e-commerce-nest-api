import LOGIN_MUTATION from "../../../graphql/user/mutations/login";

// @ts-ignore
import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
interface Props {
  children: (data: {
    submit: (values: any) => Promise<null>;
  }) => JSX.Element | null;
}
export const LoginController = (props: Props) => {
  const [login] = useMutation(LOGIN_MUTATION);
  const submit = ({ email, password }: { email: string; password: string }) => {
    return login({
      variables: { email, password }
    })
      .then(({ login }: any) => {
        localStorage.setItem("token", login.token);
        return null;
      })
      .catch(err => {
        return err;
      });
  };
  return props.children({ submit });
};
