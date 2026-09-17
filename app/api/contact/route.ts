import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  const { name, email, message } = (await request.json()) as ContactPayload

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_EMAIL } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_EMAIL) {
    console.error('Contact email configuration is incomplete.')
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"${name.trim()}" <${GMAIL_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Portfolio contact from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact email delivery failed:', error)
    return NextResponse.json({ error: 'Message could not be sent.' }, { status: 502 })
  }
}
