module.exports = (req, res) => {
  const { email } = req.query;

  const breachedEmails = {
    "teste@example.com": ["LinkedIn", "Adobe", "Dropbox"],
    "usuario@vazado.com": ["Facebook", "Yahoo"]
  };

  const breaches = breachedEmails[email?.toLowerCase()] || [];

  res.status(200).json({
    breached: breaches.length > 0,
    breaches
  });
};