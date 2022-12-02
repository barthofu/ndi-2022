import { Button, Container, Flex, Progress, Text, useToast } from '@chakra-ui/react'
import { generalConfig } from '@core/configs'
import { useStorage } from '@core/hooks'
import Link from 'next/link'
import React from 'react'

type PageProps = {
    page: Strapi.Page
}

export const Page: React.FC<PageProps> = ({ page }) => {

    const { updateItem, getItem } = useStorage()
    const toast = useToast()

	return (<>

        <Progress hasStripe value={parseInt(getItem('score'))} />

        <Flex h='95vh' w='100vw' alignItems='center' justifyContent='space-around' flexDir='column'>

            <Container maxW='container.lg' p='1em' bgColor='#fafafa' boxShadow='0 0 10px 5px rgba(0,0,0, 0.06)'>

                <Text size='lg' mb='2em' textAlign='center'>{page.text}</Text>

                <Flex flexDir='column'>

                    {page.options.map((option) => (<>
                        <Link
                            href={`/${option.redirect}`}
                        >
                            <Button mb='1em' w='auto' onClick={() => {
                                updateItem('score', (score: string) => {
                                    if (option.positive) {
                                        toast({
                                            title: 'Bonne réponse !',
                                            status: 'success',
                                            duration: 5000,
                                            isClosable: true,
                                        })
                                        const newScore = parseInt(score) + generalConfig.scoreOffset
                                        return (newScore > 100 ? 100 : newScore).toString()
                                    }
                                    else {
                                        toast({
                                            title: 'Mauvaise réponse !',
                                            status: 'error',
                                            duration: 5000,
                                            isClosable: true,
                                        })
                                        const newScore = parseInt(score) - generalConfig.scoreOffset
                                        return (newScore < 0 ? 0 : newScore).toString()
                                    }
                                })
                            }}>
                                {option.text}
                            </Button>
                        </Link>
                    </>))}

                </Flex>
            </Container>
            
        </Flex>

        

    </>)
}