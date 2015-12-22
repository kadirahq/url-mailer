# url-mailer

Create a mail client with standard url to a smtp server. So the url of mail client is the only configuration option you need to keep.

### ES6

```javascript
import MailClient from 'url-mailer';

const mailUrl = 'smtp://user:pass@smtp.test.host:465';
const mailer = new MailClient(mailUrl, {});

const mailOptions = {
  from: 'Bob Sanders <bob@example.com>',
  to: 'alice@example.com',
  subject: 'Hey Alice',
  content: '<b>Important:</b> Check <a href="http://foobar.com"> this </a>'
}

mailer.sendEmail(mailOptions).then(() => {
  console.log('successful!')
});
```
