export const reduxAction = {
    SESSION : (data) => {
        return {
            type : 'SESSION',
            data: data,
        }
    },
    HASHTAG_MENU : (data) => {
        return {
            type : 'HASHTAG_MENU',
            data : data,
        }
    },
    SCREEN_SIZE : (data) => {
        return {
            type : 'SCREEN_SIZE',
            data : data,
        }
    },
    ALERT : (data) => {
        return {
            type : 'ALERT',
            data : data,
        }
    }
}