import * as React from "react";
import { LoginController } from "./loginController";

import { LoginView } from "./loginView";

export const LoginConnector: React.FC = () => (
    <LoginController>
        {({ submit }: any) => <LoginView submit={submit} />}
    </LoginController>
);
