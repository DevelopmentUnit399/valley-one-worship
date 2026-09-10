import { useEffect } from 'react'

export function UseDocumentTitle(title, prevailOnUnmount = false) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = `${title} | Valley One Worship`

        return () => {
            if (!prevailOnUnmount) {
                document.title = prevTitle
            }
        }
    }, [title, prevailOnUnmount])
}