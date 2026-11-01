/**
 * Grouse contact form. Lives in Google Apps Script (script.google.com) under josh@grousestudio.au, as a Web app:
 * Execute as: Me. Who has access: Anyone. The deployment URL goes in _config.yml as contact_form_endpoint.
 * This copy is for reference. After changing the script in Google, deploy a new version.
 */
var SEND_TO = 'hello@grousestudio.au';
var GOALS = {
  membership: "I'm interested in membership",
  coaching: "I'm interested in 1:1 coaching",
  question: 'I have a question',
  other: 'Something else'
};

// Run once from the editor so Google asks for permission to send email.
function setup() {
  Logger.log(MailApp.getRemainingDailyQuota());
}

function doPost(e) {
  var d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply_({ ok: false, message: 'Bad request.' });
  }
  // Hidden field only bots fill in: pretend it worked and do nothing.
  if (d.company) return reply_({ ok: true });

  var name = clean_(d.name, 200);
  var email = clean_(d.email, 200);
  var phone = clean_(d.phone, 50);
  var goal = GOALS[d.goal] || clean_(d.goal, 100);
  var message = String(d.message || '').slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply_({ ok: false, message: 'Please provide a valid name and email.' });
  }

  var body = 'Name: ' + name + '\nEmail: ' + email + '\n' + (phone ? 'Phone: ' + phone + '\n' : '') +
    'Looking for: ' + goal + '\n\nMessage:\n' + message + '\n';
  try {
    MailApp.sendEmail({ to: SEND_TO, replyTo: email, subject: 'New contact form submission: ' + name, body: body });
  } catch (err) {
    return reply_({ ok: false, message: 'Email failed to send.' });
  }
  return reply_({ ok: true });
}

// Single line, no control characters: these values go into the email subject and headers.
function clean_(v, max) {
  return String(v || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
