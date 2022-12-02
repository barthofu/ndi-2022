import { ScoreContext } from '@core/state'
import { trpc } from '@utils/lib'
import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Box, Button } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useStorage } from '@core/hooks'
import { Page } from '@components/modules'

const PagePage: NextPage<any> = ({ setScore }) => {

	const router = useRouter()

	const { data, error } = trpc.story.getStory.useQuery({
		pageId: parseInt(router.query.pageId as string),
	})

	return (<>

		<DefaultLayout
			title='Page'
		>

			{error && <Box>{error.message}</Box>}
			{!data && !error && <Box>Loading...</Box>}
			{data && <>
				
				<Page page={data}/>

			</>}

		</DefaultLayout>		
	
	</>)
}

export default PagePage