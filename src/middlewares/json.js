export async function json(req, res) {
  const buffers = [];
  // entra com os dados em JSON
  for await (const chuck of req) {
    buffers.push(chuck);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }
  // retorna em JSON
  res.setHeader('Content-type', 'application/json')
}