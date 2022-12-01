namespace Strapi {

    // UTILS

    type GenericProps<T> = T & { 
        id?: number
        createdAt?: string
        updatedAt?: string
    }

    type Component<T> = T & {
        id: string
        __component: string
    }

    type ImageFormatData = {
        name: string
        hash: string
        url: string
        ext: string
        mime: string
        width: number
        height: number
        size: number
        path: string | null
    }

    type ImageFormats = 'thumbnail' | 'small' | 'medium' | 'large'

    type Image = {
        name: string
        alternativeText: string
        caption: string
        width: number
        height: number
        hash: string
        ext: string
        mime: string
        size: number
        url: string
        previewUrl: string | null
        provider: string
        provider_metadata: string | null
        createdAt: string
        updatedAt: string
        formats: {
            [key in ImageFormats]?: ImageFormatData
        }
    }

    type Correspondance = {

        'story': Story
        'page': Page
        'option': Option
    }

    // COLLECTION TYPES

    type Option = {
        text: string
        positive: number
        redirect: Page
    }

    type Page = {
        number: number
        text: string
        options: Option[]
        story: Story
    }

    type Story = {
        name: string
        pages: Page[]
    }


    // SINGLE TYPES

    
    // COMPONENTS
    
}