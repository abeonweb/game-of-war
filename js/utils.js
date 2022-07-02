function cardValue(value){
    switch(value){
        case "JACK": return 11
        case "QUEEN":  return 12
        case "KING":  return 13
        case "ACE": return 14
        default: return parseInt(value)
    }
}

export {cardValue}