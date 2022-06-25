import { Container, HStack, Text } from "@chakra-ui/react";

const Banner = () =>
{
    return (
        <>
            <Container maxW='100%' bg='teal' color='white' height='auto'>
                <HStack d='flex' alignItems='center' justifyContent='center'>
                    <Text color='white' fontSize='5xl' >Metronet</Text>
                </HStack>
            </Container>
        </>
    )
}

export default Banner;