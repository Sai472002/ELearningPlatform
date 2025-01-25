const otpgen = () => {
    const length = 6
    const number = "0123456789"
    let otp = ""
    for(i=0;i<length;i++){
        otp += number.charAt( Math.floor(Math.random()*number.length))
    }
    return otp
}

module.exports = otpgen