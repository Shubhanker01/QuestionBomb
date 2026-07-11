import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../../models/user.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleAuth = asyncHandler(async (req: Request, res: Response) => {
    const { idToken } = req.body
    if (!idToken) {
        console.log("Token not found")
        res.status(400).json({ message: "Token not found!!!" })
        return
    }
    const ticket = await googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload()
    if (!payload) {
        console.log("Invalid identity received from google")
        res.status(401).json({ message: "Invalid identity received from google" })
        return
    }
    const { email, name, picture, iat, exp } = payload
    let user = await User.findOne({ email: email })
    if (!user) {
        user = await User.create({
            name: name,
            email: email,
            tokenIssuedAt: iat,
            tokenExpiredAt: exp,
            avatar: picture,
            isPaidUser: false
        })
    }
    else {
        user.tokenIssuedAt = iat
        user.tokenExpiredAt = exp
        await user.save()
    }
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const
    }
    res.status(200).cookie('user', JSON.stringify({
        name: user.name,
        email: user.email,
        avatar: user.avatar
    }), options).json({
        message: "Authentication successfull!!!",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
    })
})

export { googleAuth }