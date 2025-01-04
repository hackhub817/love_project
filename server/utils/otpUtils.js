class OTPService {
  constructor() {
    this.otps = new Map();
    // Clean up expired OTPs every minute
    setInterval(() => this.cleanupExpiredOTPs(), 60000);
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  saveOTP(email, otp) {
    this.otps.set(email, {
      code: otp,
      expiresAt: Date.now() + 60000, // 5 minutes from now
    });
  }

  verifyOTP(email, otp) {
    const otpData = this.otps.get(email);

    if (!otpData) return false;
    if (Date.now() > otpData.expiresAt) {
      this.otps.delete(email);
      return false;
    }
    if (otpData.code !== otp) return false;

    // Delete OTP after successful verification
    this.otps.delete(email);
    return true;
  }

  cleanupExpiredOTPs() {
    const now = Date.now();
    for (const [email, otpData] of this.otps.entries()) {
      if (now > otpData.expiresAt) {
        this.otps.delete(email);
      }
    }
  }
  resendOTP(email) {
    // Generate new OTP
    const newOTP = this.generateOTP();

    // Save new OTP (overwrites existing one if any)
    this.saveOTP(email, newOTP);

    return newOTP;
  }
}

export default new OTPService();
