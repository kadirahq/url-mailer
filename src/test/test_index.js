import 'babel-polyfill';
import MailClient from '../index';
import { expect } from 'chai';
const mailUrl = 'smtp://testuser:testpass@smtp.test.host:465';

describe('MailClient', () => {
  describe('initialization', () => {
    it('should set email options correctly', () => {
      const m = new MailClient(mailUrl, {});

      const options = m.transport.transporter.options;

      delete options.name; // This gets set to the name of the machine

      expect(options).to.deep.equal({
        secure: true,
        host: 'smtp.test.host',
        port: '465',
        auth: {
          user: 'testuser',
          pass: 'testpass'
        }
      });
    });
  });

  describe('sendEmail()', () => {
    it('should send the email as instructed', async () => {
      const m = new MailClient(mailUrl, {});
      let sendEmailCalled = false;
      const testOptions = {
        from: 'Kadira Alerts <alerts-noreply@kadira.io>',
        to: 'foo@example.com',
        subject: 'Foo Bar Baz',
        html: '<b>foo</b> bar baz <a href="http://foobar.com"> Foo Bar </a>',
        text: 'foo bar baz Foo Bar [http://foobar.com]'
      };
      m.transport.sendMail = mailOptions => {
        expect(mailOptions).to.deep.equal(testOptions);
        sendEmailCalled = true;
        // return a promise that just fullfills
        return Promise.resolve();
      };

      const mailOptions = {
        from: testOptions.from,
        to: testOptions.to,
        subject: testOptions.subject,
        content: testOptions.html
      }

      await m.sendEmail(mailOptions);
      expect(sendEmailCalled).to.be.true;
    });
  });
});