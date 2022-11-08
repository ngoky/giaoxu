import { useEffect, useState } from 'react'

export default function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        heigh: window.innerHeight
    })
    useEffect(() => {
        const handleSize = () => {
            setSize({ width: window.innerWidth, heigh: window.innerHeight })
        }
        window.addEventListener('resize', handleSize)
        return () => {
            window.removeEventListener('resize', handleSize)
        }
    }, [])
    return size
}
