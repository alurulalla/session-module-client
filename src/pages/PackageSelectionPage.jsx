import { Box, Button, Container, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import queryString from 'query-string';

import PackageItems from "../component/PackageItems";
import { useHistory, useLocation } from "react-router-dom";

const PackageSelectionPage = () =>
{
    const step = 2;
    const [packageItems, setPackageItems] = useState([]);
    const [selectedPack, setSelectedPack] = useState(null);
    const [selectedPackageIndex, setSelectedPackageIndex] = useState();
    const history = useHistory();
    const { search } = useLocation();
    const values = queryString.parse(search);

    useEffect(() =>
    {
        getSessionPackages();
    }, []);

    useEffect(() =>
    {
        if (selectedPack) {
            const packageIndex = packageItems.findIndex(x => x.id === selectedPack?.id);
            if (packageIndex > -1) {
                packageItems[packageIndex] = selectedPack;
            }
            setPackageItems(prev => packageItems);
        }

    }, [selectedPack, packageItems])

    const getSessionPackages = async () =>
    {
        const { data } = await axios.get(`/api1/session?sessionKey=step ${step}`);
        if (data) {
            const sessionPackage = { ...data.selectedPackage, isDefaultChecked: true };
            setSelectedPack(prev => sessionPackage);
        }

        await getPackages();

        if (data && !values.back) {
            history.push('/create-account');
        }


    }

    const getPackages = async () =>
    {
        try {
            const { data } = await axios.get('/api2/products');
            setPackageItems(data);
        } catch (err) {
            console.log(err);
        }
    }

    const selectedPackage = (pack) =>
    {
        setSelectedPack(pack);
    }

    const onNext = async () =>
    {
        const selectedPackage = packageItems.find(x => x.id === selectedPack);

        const obj = {
            sessionKey: `step ${step}`,
            data: {
                selectedPackage
            }
        };

        const { data } = await axios.post('/api1/session', obj);

        if (data) {
            history.replace('/create-account');
        }
    }

    const onBack = () =>
    {
        history.push('/?back=step 1');
    }

    return (
        <Container maxW="xl">
            <Text fontSize='xs'>Step {step} of 4</Text>
            <Text fontSize='xl'>Customize Plan</Text>
            <VStack spacing="5px" color="black">
                <Box d="flex"
                    justifyContent="center"
                    p="3"
                    bg="gray.700"
                    w="100%"
                    borderRadius="lg"
                    borderWidth="1px">
                    <PackageItems packageItems={packageItems} selectedPackage={selectedPackage} />
                </Box>
            </VStack>
            <Stack spacing={5} direction='row' mt='3'>
                <Button colorScheme='teal' color='white' onClick={onBack}>Back</Button>
                <Button colorScheme='teal' color='white' mt='2' disabled={!selectedPack} onClick={onNext}>Next</Button>
            </Stack>
        </Container>
    )
}

export default PackageSelectionPage;