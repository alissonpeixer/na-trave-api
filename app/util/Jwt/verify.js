import jwt from "jsonwebtoken"

export const VerifyJwtToken = (code) =>{

    const decoded = jwt.verify(code, process.env.JWT_SECRET);


    return decoded
}