import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const CreateAccountPage = () => {
  const step = 3;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const { search } = useLocation();
  const values = queryString.parse(search);

  const history = useHistory();

  useEffect(() => {
    getPackageDeatils();
  }, []);

  const getPackageDeatils = async () => {
    const previousData = await axios.get(
      `/api1/session?sessionKey=step ${step - 1}`
    );
    if (previousData) {
      const { data } = await axios.get(`/api1/session?sessionKey=step ${step}`);
      if (data) {
        setFirstName(data.userDetails.firstName);
        setLastName(data.userDetails.lastName);
        setEmail(data.userDetails.email);
        setNumber(data.userDetails.number);
      }

      if (data && !values.back) {
        history.push('/payment');
      }
    } else {
      history.push('/package-selection');
    }
  };

  const onCreateAccount = async () => {
    if (firstName && lastName && email && number) {
      const obj = {
        sessionKey: `step ${step}`,
        data: {
          userDetails: {
            firstName,
            lastName,
            email,
            number,
          },
        },
      };
      const { data } = await axios.post('/api1/session', obj);

      if (data) {
        history.push('/payment');
      }
    }
  };

  const onBack = () => {
    history.push(`/package-selection?back=step ${step}`);
  };

  return (
    <Container maxW="xl">
      <Text fontSize="xs">Step {step} of 4</Text>
      <Text fontSize="xl">Create Account</Text>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        p="3"
        bgColor="gray.700"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Stack spacing={5} my={5}>
          <HStack spacing="10px" color="black">
            <FormControl id="firstName" isRequired>
              <Text fontSize="xs" color="white">
                First name
              </Text>
              <Input
                value={firstName}
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                _placeholder={{ opacity: 1, color: 'white' }}
                color="white"
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <Text fontSize="xs" color="white">
                Last name
              </Text>
              <Input
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                _placeholder={{ opacity: 1, color: 'white' }}
                color="white"
              />
            </FormControl>
          </HStack>
          <HStack spacing="10px" color="black">
            <FormControl id="email" isRequired>
              <Text fontSize="xs" color="white">
                Email
              </Text>
              <Input
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                _placeholder={{ opacity: 1, color: 'white' }}
                color="white"
              />
            </FormControl>
            <FormControl id="number" isRequired>
              <Text fontSize="xs" color="white">
                Phone number
              </Text>
              <Input
                value={number}
                placeholder="Enter your phone number"
                onChange={(e) => setNumber(e.target.value)}
                _placeholder={{ opacity: 1, color: 'white' }}
                color="white"
              />
            </FormControl>
          </HStack>
        </Stack>
      </Box>
      <Stack spacing={5} direction="row" mt="3">
        <Button colorScheme="teal" color="white" onClick={onBack}>
          Back
        </Button>
        <Button
          colorScheme="teal"
          color="white"
          mt="2"
          onClick={onCreateAccount}
        >
          Create Account
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateAccountPage;
