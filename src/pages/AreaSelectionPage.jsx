import { useEffect, useState } from "react";
import { Button, Container, FormControl, Input, Text, VStack } from "@chakra-ui/react";
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

const AreaSelectionPage = () =>
{
    const [areaCode, setAreaCode] = useState('');
    const history = useHistory();
    const step = 'step 1';
    const { search } = useLocation();
    const values = queryString.parse(search);

    useEffect(() =>
    {
        getUserAreaCode();
    }, []);

    const getUserAreaCode = async () =>
    {
        const { data } = await axios.get(`/api1/session?sessionKey=${step}`);
        if (data) {
            setAreaCode(data.userAreaCode);
        }

        if (data && !values.back) {
            history.replace('/package-selection')
        }
    }

    const onNext = async () =>
    {
        const obj = {
            sessionKey: 'step 1',
            data: {
                "userAreaCode": areaCode
            }
        };

        try {
            const { data } = await axios.post('/api1/session', obj);
            history.replace('/package-selection')
            console.log(data);
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <Container maxW="xl">
            <Text fontSize='xs'>Step 1 of 4</Text>
            <VStack spacing="5px" color="black">
                <FormControl id="areacode" isRequired>
                    <Input value={areaCode} placeholder='Enter your area code'
                        onChange={(e) => setAreaCode(e.target.value)} />
                </FormControl>
            </VStack>
            <Button colorScheme='teal' color='white' mt='2' onClick={onNext}>Next</Button>
        </Container>
    )
}

export default AreaSelectionPage;