import { useTranslation } from "react-i18next"

export const random = ({ min = 1, max = 5 }) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const useTranslate = (key) => {
    const { t } = useTranslation()
    return t(key, {returnObjects: true})
}

export const useTranslateObjects = (key) => {
    const { t } = useTranslation()
    return t(key, { returnObjects: true })
}

export default {random}