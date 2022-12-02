import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { useStorage } from '@core/hooks'

type PageProps = {
    page: Strapi.Page
}

export const Page: React.FC<PageProps> = ({ page }) => {

    const router = useRouter()
    const { updateItem } = useStorage()

	return (<>
		
        <Box>{page.text}</Box>

        {page.options.map((option) => (<>
            <Link
                href={`/${option.redirect}`}
            >
                <Button onClick={() => {
                    updateItem('score', (score: string) => {
                        return `${parseInt(score) + (option.positive ? 1 : -1)}`
                    })
                }}>
                    {option.text}
                </Button>
            </Link>
        </>))}

    </>)
}