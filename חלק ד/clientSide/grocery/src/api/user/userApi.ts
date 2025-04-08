export function isValidPhoneNumber(phoneNumber:string) {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phoneNumber);
}
 
export function isValidID(id:string) {
    const idRegex = /^\d{9}$/; 
    return idRegex.test(id);
}

export function isValidEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}

export function isValidPassword(password:string, verify:string)
{
    return password===verify
}