const AWS = require('aws-sdk'),
    SES = new AWS.SES(),
    processResponse = require('./process-response.js'),
    FROM_EMAIL = process.env.FROM_EMAIL;

exports.handler = (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return Promise.resolve(processResponse(true));
    }

    if (!event.body) {
        return Promise.resolve(processResponse(true, 'Please specify email parameters: email, name, and accountId ', 400));
    }
    const emailData = JSON.parse(event.body);

    if (!emailData.email) {
        return Promise.resolve(processResponse(true, 'Please specify email parameter', 400));
    }

    const destination = {
        ToAddresses: [emailData.email] // SES expects this to be a string array
    }

    if (emailData.ccEmails) {
        destination.CcAddresses = emailData.ccEmails;
    }

    const templateData = {
        name: emailData.name,
        email: emailData.email,
        accountId: emailData.accountId
    };

    console.log('Email template data', JSON.stringify(templateData));

    const templatedEmailParams = {
        Destination: destination,
        Template: emailData.templateName,
        Source: FROM_EMAIL,
        TemplateData: JSON.stringify(templateData)
    };

    return SES.sendTemplatedEmail(templatedEmailParams).promise()
        .then(() => (processResponse(true)))
        .catch(err => {
            console.error(err, err.stack);
            const errorResponse = err.message;
            return processResponse(true, errorResponse, 500);
        });
};
