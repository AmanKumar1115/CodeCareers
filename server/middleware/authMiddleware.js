import jwt from 'jsonwebtoken'
import Company from '../models/company.model.js'

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.json({ success: false, message: 'Not authorized, Login Again' })
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.company = await Company.findById(decode.id).select('-password')

        next();
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}