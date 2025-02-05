import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk with database
export const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook received"); // Check if webhook is triggered

        // Log Headers to Debug Verification Issues
        console.log("Headers:", req.headers);

        // Log Raw Body for Debugging
        console.log("Request Body:", JSON.stringify(req.body, null, 2));

        // create a svix instance with clerk webhook secret
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            throw new Error("CLERK_WEBHOOK_SECRET is not set in environment variables");
        }
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifying Headers
        try {
            await whook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });
        } catch (verificationError) {
            console.error("Webhook verification failed:", verificationError.message);
            return res.status(400).json({ success: false, message: "Webhook verification failed" });
        }

        // getting data from request body
        const { data, type } = req.body;

        console.log(`Processing webhook event: ${type}`);

        //Switch cases for different Events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address || "",
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url || "",
                    resume: ''
                };

                console.log("Creating new user:", userData);

                await User.create(userData);
                res.status(201).json({ success: true, message: "User created" });
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0]?.email_address || "",
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url || "",
                };

                console.log("Updating user:", userData);

                const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
                if (!updatedUser) {
                    console.error("User not found for update:", data.id);
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                res.status(200).json({ success: true, message: "User updated" });
                break;
            }
            case 'user.deleted': {
                console.log("Deleting user with ID:", data.id);
                const deletedUser = await User.findByIdAndDelete(data.id);
                if (!deletedUser) {
                    console.error("User not found for deletion:", data.id);
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                res.status(200).json({ success: true, message: "User deleted" });
                break;
            }
            default:
                console.log(`Unhandled event type: ${type}`);
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }
    } catch (error) {
        console.error("Error processing webhook:", error.message);
        res.status(500).json({ success: false, message: 'Webhook processing error' });
    }
};
