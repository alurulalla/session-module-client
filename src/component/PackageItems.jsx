import { Box, RadioGroup, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Package from "./Package";

const PackageItems = ({ packageItems, selectedPackage }) =>
{
    console.log(packageItems)
    const [valid, setValid] = useState(false);
    const [packageValue, setPackageValue] = useState();
    const [defaultValue, setDefaultValue] = useState(null);


    useEffect(() =>
    {
        if (packageItems.length > 0) {
            const indexValue = packageItems.findIndex(x => x.isDefaultChecked === true);
            console.log(packageItems[0].id)
            setDefaultValue(packageItems[0].id);
            setValid(true);
        }
    }, [packageItems])

    const onPackageSelect = (item) =>
    {
        setPackageValue(item)
        selectedPackage(item);
    }

    return (
        <Box my={5}>
            <RadioGroup defaultValue={defaultValue} onChange={val => console.log(val)}>
                <Stack spacing={5}>
                    {valid && packageItems?.map(item => <Package key={item.id} price={item.price} data={item.data} description={item.description} dataUnit={item.dataUnit} id={item.id} period={item.period} onPackageSelect={onPackageSelect} isDefaultChecked={item?.isDefaultChecked} />)}
                </Stack>
            </RadioGroup>
        </Box>
    )
}

export default PackageItems;