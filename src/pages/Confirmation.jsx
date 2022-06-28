import { Button, Container, Text, VStack } from "@chakra-ui/react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Confirmation = () =>
{
    const history = useHistory();
    const onContinue = async () =>
    {
        try {
            await axios.delete('/api1/session');
            history.replace('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Container maxW="xl">
                <VStack spacing="10px" color="black" display='flex' justifyContent='center' alignItems='center' >
                    <Text color='black' fontSize='2xl'>Payment Confirmed.</Text>
                    <Text color='black' fontSize='md'>Thanks for choosing Metronet.</Text>
                    <Button colorScheme='teal' color='white' mt='5' onClick={onContinue}>Continue</Button>
                </VStack>

            </Container>
        </>
    )
}

export default Confirmation;