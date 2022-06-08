import { Box, Button, Heading, Text } from "@chakra-ui/react";

const Product = ({ name, price, description, onSelectPackage }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" width={300} my={3}>
      <Heading fontSize="xl">{name}</Heading>
      <Text mt={4}>{description}</Text>
      <Text mt={4}>${price}</Text>
      {onSelectPackage && (
        <Button colorScheme="yellow" onClick={onSelectPackage} mt="5">
          Select
        </Button>
      )}
    </Box>
  );
};

export default Product;
