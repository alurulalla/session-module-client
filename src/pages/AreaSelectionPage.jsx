import { Box, Container, FormControl, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const AreaSelectionPage = () =>
{
    const [areaCode, setAreaCode] = useState();

    return (
        <Container my='0' mx='auto' width='800px'>
            <Text fontSize='xs'>Step 0 of 4</Text>
            <Box bg="white"
                w="100%"
                p={4}
                borderRadius="lg"
                color="black"
                borderWidth="1px">
                <VStack spacing="5px" color="black">
                    <FormControl id="areacode" isRequired>
                        <Input value={areaCode} placeholder='Enter your area code'
                            onChange={(e) => setAreaCode(e.target.value)} />
                    </FormControl>
                </VStack>
            </Box>
        </Container>
    )
}

export default AreaSelectionPage;