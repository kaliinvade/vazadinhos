
export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório.' });
  }

  const apiKey = process.env.HIBP_API_KEY;
  const encodedEmail = encodeURIComponent(email);
  const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodedEmail}?truncateResponse=true`;

  try {
    const response = await fetch(url, {
      headers: {
        'hibp-api-key': apiKey,
        'user-agent': 'bahead-verificador'
      }
    });

    if (response.status === 404) {
      return res.status(200).json({ breached: false });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao consultar a API.' });
    }

    const data = await response.json();
    const breaches = data.map(entry => entry.Name);
    return res.status(200).json({ breached: true, breaches });
  } catch (err) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}
