import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { fromString } from 'html-to-text';
import url from 'url';

const { info } = console;

export default class MailClient {
  constructor(mailUrl, {loggingOnly = false, from}) {
    this.mailUrl = mailUrl || 'smtp://user:pass@smtp.host:465';
    this.loggingOnly = loggingOnly;
    this.from = from;

    const {
      auth, port, hostname
    } = url.parse(this.mailUrl);

    const smtpOptions = {
      host: hostname,
      secure: port === '465',
      port: port || 25,
      auth: {user: auth.split(':')[0], pass: auth.split(':')[1]}
    };

    const smtp = smtpTransport(smtpOptions);
    this.transport = nodemailer.createTransport(smtp);
  }

  sendEmail({from, to, subject, content}) {
    if (this.loggingOnly) {
      info(`Sending Email: to=${to} subject=${subject}`);
      return Promise.resolve(true);
    }

    const mailOptions = {
      from: from || this.from,
      to,
      subject,
      text: fromString(content),
      html: content
    };

    return this.transport.sendMail(mailOptions);
  }
}
