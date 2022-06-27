import { Box, HStack, Radio, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const Package = ({
  id,
  data,
  description,
  price,
  period,
  dataUnit,
  isDefaultChecked,
  onPackageSelect,
}) => {
  console.log(id);
  const [val, setVal] = useState(id);
  const onPackage = () => {
    console.log('here');
    setVal(id);
    onPackageSelect(id);
  };
  return (
    <>
      <Box
        d="flex"
        justifyContent="center"
        p="3"
        bg="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <HStack spacing="5">
          <Radio
            size="md"
            name={id}
            colorScheme="teal"
            onChange={onPackage}
            value={id}
          >
            <Stack>
              <Text fontSize="md">
                {data}
                {dataUnit} ${price}/{period}
                {isDefaultChecked}
              </Text>
              <Text fontSize="xs">{description}</Text>
            </Stack>
          </Radio>
        </HStack>
      </Box>
    </>
  );
};

export default Package;
