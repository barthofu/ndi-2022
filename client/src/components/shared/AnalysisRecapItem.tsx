import { Icon, Center, Text, Flex, IconProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

const AnalysisRecapItem: React.FC<{title: string, subtitle: string, icon: IconType}> = ({title, subtitle, icon}) => {
	return (
    <Flex>
      <Center w='70px' h='70px' bg="black" borderRadius={10}>
        <Icon as={icon} color="white" boxSize={9} />
      </Center>
      <Flex paddingStart={2.5} h='70px' justify='center' direction='column'>
        <Text fontWeight={'bold'} fontSize={"18px"}>{title}</Text>
        <Text fontSize={"15px"}>{subtitle}</Text>
      </Flex>
    </Flex>
	)
}

export default AnalysisRecapItem