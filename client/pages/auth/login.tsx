import React from "react";
import Layout from "../../components/Layout";
import { NextPage } from "next";
import { LoginConnector } from "../../components/auth/login/loginConnector";
import withData from "../../lib/apollo";
const LoginPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <LoginConnector />
    </Layout>
  );
};

export default withData((props: any) => <LoginPage {...props} />);
