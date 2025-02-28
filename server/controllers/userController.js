import Job from "../models/Job.model.js";
import JobApplication from "../models/jobApplication.model.js";
import User from "../models/User.model.js"
import { v2 as cloudinary } from 'cloudinary'

// Get user data
export const getUserData = async (req, res) => {

    const userId = req.auth.userId


    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Apply for a job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body
    const userId = req.auth.userId
    console.log("jobId", jobId)
    console.log("userId", userId)


    try {
        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Already Applied" })
        }

        const jobData = await Job.findById(jobId);


        if (!jobData) {
            return res.json({ success: false, message: "Job Not found" })
        }

        await JobApplication.create({
            userId,
            companyId: jobData.companyId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: "Applied Successfully!" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get user applied applications
export const getUserJobApplication = async (req, res) => {
    try {
        const userId = req.auth.userId

        const application = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!application) {
            return res.json({
                success: false,
                message: "No job application found for this user."
            })
        }

        return res.json({
            success: true,
            application
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Update user Resume or profile
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId

        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save();

        return res.json({ success: true, message: "Resume Updated" });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
