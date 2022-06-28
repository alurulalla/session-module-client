import
{
    Box,
    Button,
    Container,
    FormControl,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PaymentPage = () =>
{
    const step = 4;
    const [paymentType, setPaymentType] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountName, setAccountName] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    const history = useHistory();

    useEffect(() =>
    {
        getUserDetails();
    }, []);

    const onBack = () =>
    {
        history.push(`/create-account?back=step ${step - 1}`);
    };

    const getUserDetails = async () =>
    {
        const { data } = await axios.get(
            `/api1/session?sessionKey=step ${step - 1}`
        );
        if (data) {
            setUserDetails(data);
        } else {
            history.push('/create-account');
        }
    };

    const onSubmit = async () =>
    {
        if (
            paymentType &&
            accountType &&
            accountName &&
            routingNumber &&
            accountNumber
        ) {
            const obj = {
                sessionKey: `step ${step}`,
                data: {
                    userDetails,
                    paymentDetails: {
                        paymentType,
                        accountType,
                        accountName,
                        routingNumber,
                        accountNumber,
                    },
                },
            };
            try {
                const { data } = await axios.post('/api1/session', obj);

                if (data) {
                    history.push('/confirmation');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Container maxW="xl">
            <Text fontSize="xs">Step {step} of 4</Text>
            <Text fontSize="xl">Payment Details</Text>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                p="3"
                bg="gray.700"
                w="100%"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Stack spacing={5}>
                    <RadioGroup
                        onChange={setPaymentType}
                        value={paymentType}
                        colorScheme="white"
                    >
                        <Stack direction="row">
                            <Radio value="1">
                                <Text color="white">ACH Transfer</Text>
                            </Radio>
                            <Radio value="2">
                                <Text color="white">Credit/Debit Card</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <RadioGroup
                        onChange={setAccountType}
                        value={accountType}
                        colorScheme="white"
                    >
                        <Stack direction="row">
                            <Radio value="1">
                                <Text color="white">Checking</Text>
                            </Radio>
                            <Radio value="2">
                                <Text color="white">Savings</Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <FormControl id="accountName" isRequired>
                        <Text fontSize="xs" color="white">
                            Account name
                        </Text>
                        <Input
                            value={accountName}
                            placeholder="Enter your account name"
                            onChange={(e) => setAccountName(e.target.value)}
                            _placeholder={{ opacity: 1, color: 'white' }}
                            color="white"
                        />
                    </FormControl>
                    <FormControl id="routingNumber" isRequired>
                        <Text fontSize="xs" color="white">
                            Routing Number
                        </Text>
                        <Input
                            value={routingNumber}
                            placeholder="Enter your routing number"
                            onChange={(e) => setRoutingNumber(e.target.value)}
                            _placeholder={{ opacity: 1, color: 'white' }}
                            color="white"
                        />
                    </FormControl>
                    <FormControl id="accoutNumber" isRequired>
                        <Text fontSize="xs" color="white">
                            Account number
                        </Text>
                        <Input
                            value={accountNumber}
                            placeholder="Enter your account number"
                            onChange={(e) => setAccountNumber(e.target.value)}
                            _placeholder={{ opacity: 1, color: 'white' }}
                            color="white"
                        />
                    </FormControl>
                </Stack>
            </Box>
            <Stack spacing={5} direction="row" mt="3">
                <Button colorScheme="teal" color="white" onClick={onBack}>
                    Back
                </Button>
                <Button colorScheme="teal" color="white" onClick={onSubmit}>
                    Submit
                </Button>
            </Stack>
        </Container>
    );
};

export default PaymentPage;
