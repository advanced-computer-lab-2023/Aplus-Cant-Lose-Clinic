const { sendEmail } = require("../sendMailService");

const sendAccessRequestApprovalEmail = async (email, title) => {
    const context = {
        Title: title,
        email: email
    };
    sendEmail(email, context, "drapproval", "El7a2ni clinic | Access Approved 🟩");
};

module.exports = { sendAccessRequestApprovalEmail };
