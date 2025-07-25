import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.EMAIL_USERNAME, // Send the email to yourself
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <h1>New message from your portfolio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
