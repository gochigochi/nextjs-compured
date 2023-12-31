import { useRouter } from "next/router";

//BETTER CHECK WITH MIDDLEWARE SERVERSIDE
const withAuth = (WrappedComponent) => {
  return (props) => {

    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        Router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;