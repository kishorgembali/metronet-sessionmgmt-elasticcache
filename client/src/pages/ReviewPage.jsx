import { Button, Container, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useHistory } from "react-router-dom";

const ReviewPage = () => {
  const [packageData, setPackageData] = useState();
  const [user, setUser] = useState();

  const history = useHistory();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/me");
      setUser(data);

      if (!data.selectedPacakge) {
        history.replace("/dashboard");
      } else {
        getSelectedPackageDetails();
      }
    } catch (error) {
      console.log(error);
      history.replace("/login");
    }
  };

  const getSelectedPackageDetails = async () => {
    try {
      const { data } = await axios.get("/api/getselectedpackage");
      setPackageData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePlan = async () => {
    try {
      await axios.post("/api/changeplan", {});
      history.replace("/dashboard");
    } catch (error) {
      console.log(error);
      history.replace("/login");
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
    <>
      <Container>
        <Text fontSize="4xl">Hi {user?.email}</Text>
        <Button onClick={logout}>Logout</Button>
        <Text fontSize="4xl">You have selected below package</Text>
        {packageData && (
          <Product
            name={packageData.name}
            price={packageData.price}
            description={packageData.description}
          />
        )}
        <Button colorScheme="yellow" onClick={onChangePlan}>
          Change Plan
        </Button>
      </Container>
    </>
  );
};

export default ReviewPage;
