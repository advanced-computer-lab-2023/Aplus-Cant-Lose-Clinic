const { sendEmail } = require("./sendEmail");

const sendAccessRequestRejectionEmail = async (email, title) => {
    const context = {
        Title: title,
        email: email
    };
    sendEmail(email, context, "drreject", "El7a2ni clinic | Access Request Rejected 🟥");
};

module.exports = { sendAccessRequestRejectionEmail };