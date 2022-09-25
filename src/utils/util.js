const random = ({ min = 1, max = 5 }) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default { random }