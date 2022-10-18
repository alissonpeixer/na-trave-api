import jwt from "jsonwebtoken";

export const CretedJwtToken = ( user ) => {


  const acessToken = jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
    { algorithm: "RS256" }
  );


  return acessToken
}