"use server";

import { Resend } from "resend";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/accounts/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: "ICCapp <onboarding@resend.dev>", // Set your "from" email address
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
    });
    return { success: true, message: 'We have sent you a verification email. Please check your inbox and click on the link to verify your email address.' };
  } catch (error) {
    return { success: false, message: 'Failed to send verification email', error: error.message };
  }
};

