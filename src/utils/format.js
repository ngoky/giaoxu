import moment from 'moment'
const parseDateFromMillisecond = (milli) => {
    return moment(milli).format('DD-MM-YYYY')
}

const FORMAT_TYPE = {
    DATE: 'DATE',
    INT: 'INT'
}

const formatHandler = (value, type) => {
    switch (type) {
        case FORMAT_TYPE.DATE:
            return parseDateFromMillisecond()
        case FORMAT_TYPE.INT:
            return value.toString()
        default:
            return value
    }
}

const formatDataByHeaderKey = (data, header) => {
    const rows = []
    for (const obj of data) {
        const finalObject = {}
        for (const [key, value] of Object.entries(obj)) {
            const checkObject = header.find((x) => x.id === key)
            if (checkObject && checkObject.visible) {
                finalObject[key] = checkObject.format
                    ? formatData.formatHandler(value, checkObject.format.type)
                    : value
            }
        }
        rows.push({ ...finalObject, id: obj.id })
    }

    return rows
}

export const formatData = {
    parseDateFromMillisecond,
    formatHandler,
    formatDataByHeaderKey,
    FORMAT_TYPE
}
