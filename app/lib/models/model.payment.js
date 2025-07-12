import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        required: [true, "payment not found"],
        type: Number,
    },
    month: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
