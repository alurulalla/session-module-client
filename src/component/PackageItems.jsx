import { Box, HStack, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Package from './Package';

const PackageItems = ({ packageItems, selectedPackage, selectedPackId }) => {
  console.log(packageItems);
  const [valid, setValid] = useState(false);
  const [packageValue, setPackageValue] = useState();
  const [defaultValue, setDefaultValue] = useState(selectedPackId.toString());
  console.log(defaultValue);
  //   useEffect(() => {
  //     if (packageItems.length > 0) {
  //       const indexValue = packageItems.findIndex(
  //         (x) => x.isDefaultChecked === true
  //       );
  //       console.log(packageItems[0].id);
  //       setDefaultValue(packageItems[0].id);
  //       setValid(true);
  //     }
  //   }, [packageItems]);

  const onPackageSelect = (item) => {
    console.log(item);
    const pack = packageItems.find((x) => x.id === +item);
    console.log(pack);
    setPackageValue(pack);
    selectedPackage(pack);
  };

  return (
    <Box my={5}>
      <RadioGroup
        defaultValue={defaultValue}
        onChange={(v) => onPackageSelect(v)}
      >
        <Stack spacing={5}>
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
              <Radio size="md" colorScheme="teal" value="1">
                <Stack>
                  <Text fontSize="md">1 Gb $27.36/month</Text>
                  <Text fontSize="xs">Basic plan with 100mbps</Text>
                </Stack>
              </Radio>
            </HStack>
          </Box>
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
              <Radio size="md" colorScheme="teal" value="2">
                <Stack>
                  <Text fontSize="md">2 Gb $35.28/month</Text>
                  <Text fontSize="xs">Silver plan with 100mbps</Text>
                </Stack>
              </Radio>
            </HStack>
          </Box>
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
              <Radio size="md" colorScheme="teal" value="3">
                <Stack>
                  <Text fontSize="md">3 Gb $65.00/month</Text>
                  <Text fontSize="xs">Gold plan with 100mbps</Text>
                </Stack>
              </Radio>
            </HStack>
          </Box>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default PackageItems;
