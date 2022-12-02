import { Button, Container, Flex, Image, Progress, Text, useToast } from '@chakra-ui/react'
import { generalConfig } from '@core/configs'
import { useStorage } from '@core/hooks'
import { getStrapiImageUrl } from '@core/utils/functions'
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

        <Flex mt='1em' h='95vh' w='100vw' alignItems='center' justifyContent='space-around' flexDir='column'>

            <Image 
                src={process.env['NEXT_PUBLIC_STRAPI_API_URL'] + page.image.url}
                alt='image générée via intelligence artificielle'
                width='300px'
                borderRadius='10px'
                boxShadow='0 0 10px 0 rgba(0,0,0,0.3)'
            />

            <Container maxW='container.lg' p='1em' bgColor='#fafafa' boxShadow='0 0 10px 5px rgba(0,0,0, 0.06)' borderRadius='10px'>

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