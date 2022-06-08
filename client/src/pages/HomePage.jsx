import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Login from "../components/Login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Register from "../components/Register";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/me");

      if (data) {
        history.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p="3"
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" textAlign="center">
          Metronet
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
