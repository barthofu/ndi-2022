import { useState, useEffect } from 'react'

type StorageType = 'session' | 'local'
type UseStorageReturnValue = {
    getItem: (key: string) => string
    setItem: (key: string, value: string) => void
    updateItem: (key: string, action: (curr: string) => string) => void
}

export const useStorage = (): UseStorageReturnValue => {

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

    const getItem = (key: string): string => {
        return isBrowser ? window['localStorage'][key] : ''
    }

    const setItem = (key: string, value: string): boolean => {

        if (isBrowser) {
            window['localStorage'].setItem(key, value);
            return true
        }
      
        return false
    }

    const updateItem = (key: string, action: (curr: string) => string): boolean => {

        if (isBrowser) {
            window['localStorage'].setItem(key, action(window['localStorage'].getItem(key)!));
        }

        return false
    }
        

    return {
        getItem,
        setItem,
        updateItem
    }
}