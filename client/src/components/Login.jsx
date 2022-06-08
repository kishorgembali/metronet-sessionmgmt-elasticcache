import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      history.replace("/dashboard");

      toast({
        title: "Logged in successfully",
        isClosable: true,
        position: "bottom",
        status: "success",
        duration: 5000,
      });

      setLoading(false);

      return;
    } catch (error) {
      setLoading(false);
      toast({
        title: "Unable to login",
        isClosable: true,
        position: "bottom",
        status: "warning",
        duration: 5000,
      });

      return;
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          placeholder="Enter Your Email"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="teal"
        width="100%"
        mt="15"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
