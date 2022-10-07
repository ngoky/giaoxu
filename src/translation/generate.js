import fs from 'fs'

const syncLocale = ({ defaultLanguage, supportLanguages = [] }) => {
    if (!defaultLanguage) {
        return
    }
    // const obj = fs.readFile(`./${defaultLanguage}/translation.json`)
    // console.log(JSON.stringify(obj))

    supportLanguages.forEach(element => {
        console.log(element)
    });
    console.log(fs)
    // fs.readdirSync().forEach(x => {
    //     console.log(x)
    // })
}

export default { syncLocale }