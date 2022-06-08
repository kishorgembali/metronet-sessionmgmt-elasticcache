import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Product from "../components/Product";
import { Box, Button, Container, Text } from "@chakra-ui/react";

const DashboardPage = () => {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/me");
      setUser(data);

      if (!data.selectedPacakge) {
        getProductDetails();
      } else {
        history.replace("/review");
      }
    } catch (error) {
      console.log(error);
      history.replace("/login");
    }
  };

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get("/api/packagedetails");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectPackage = async (pack) => {
    try {
      await axios.post("/api/onselectedpackage", {
        selectedPackageId: pack.id,
      });
      history.replace("/review");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/user/logout", {});
      history.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Text fontSize="4xl">Hi {user?.email}</Text>
      <Button onClick={logout}>Logout</Button>
      <Text fontSize="4xl">Please select pacakge</Text>
      {products &&
        products.map((prod) => (
          <Product
            key={prod.id}
            name={prod.name}
            description={prod.description}
            price={prod.price}
            onSelectPackage={() => onSelectPackage(prod)}
          />
        ))}
    </Container>
  );
};

export default DashboardPage;
