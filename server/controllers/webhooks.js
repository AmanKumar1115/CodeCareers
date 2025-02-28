import { Webhook } from "svix";
import User from "../models/User.model.js";

// Middleware to validate webhook request
const validateWebhookRequest = (req) => {
    if (!req.body || !req.body.type || !req.body.data) {
        throw new Error('Invalid webhook payload');
    }
    if (!req.headers["svix-id"] || !req.headers["svix-timestamp"] || !req.headers["svix-signature"]) {
        throw new Error('Missing required headers');
    }
};

// Helper to validate user data
const validateUserData = (data, type) => {
    if (!data.id) {
        throw new Error('No user ID provided');
    }

    if (type === 'user.created' || type === 'user.updated') {
        if (!data.email_addresses || !data.email_addresses.length) {
            throw new Error('No email address provided');
        }
    }
};

// Main webhook handler
export const clerkWebhooks = async (req, res) => {
    try {
        console.log('Received webhook event:', req.body.type);

        // Validate the incoming request
        validateWebhookRequest(req);

        // Create a Svix instance with clerk webhook secret
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error('CLERK_WEBHOOK_SECRET is not configured');
        }

        const whook = new Webhook(webhookSecret);

        // Verify webhook signature
        try {
            await whook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });
            console.log('Webhook signature verified successfully');
        } catch (error) {
            console.error('Webhook verification failed:', error);
            return res.status(401).json({
                success: false,
                message: 'Invalid webhook signature'
            });
        }

        // Extract data and type from the webhook payload
        const { data, type } = req.body;

        // Validate user data based on event type
        validateUserData(data, type);

        // Handle different webhook events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url || '',
                    resume: ''
                };

                console.log('Creating user:', userData);
                const user = await User.create(userData);
                console.log('User created successfully:', user._id);

                return res.status(201).json({
                    success: true,
                    message: 'User created successfully'
                });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url || ''
                };

                console.log('Updating user:', data.id);
                const updatedUser = await User.findByIdAndUpdate(
                    data.id,
                    userData,
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                console.log('User updated successfully:', data.id);
                return res.status(200).json({
                    success: true,
                    message: 'User updated successfully'
                });
            }

            case 'user.deleted': {
                console.log('Deleting user:', data.id);
                const deletedUser = await User.findByIdAndDelete(data.id);

                if (!deletedUser) {
                    throw new Error('User not found');
                }

                console.log('User deleted successfully:', data.id);
                return res.status(200).json({
                    success: true,
                    message: 'User deleted successfully'
                });
            }

            default: {
                console.warn('Unhandled webhook event type:', type);
                return res.status(400).json({
                    success: false,
                    message: 'Unhandled webhook event type'
                });
            }
        }

    } catch (error) {
        console.error('Webhook Error:', {
            message: error.message,
            stack: error.stack
        });

        // Determine the appropriate status code
        const statusCode = error.message.includes('not found') ? 404 : 400;

        return res.status(statusCode).json({
            success: false,
            message: 'Webhook processing failed',
            error: error.message
        });
    }
};