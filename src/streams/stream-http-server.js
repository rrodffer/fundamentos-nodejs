import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString()) * -1
    console.log(number)
    callback(null, Buffer.from(String(number)));
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chuck of req) {
    buffers.push(chuck);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent)

  return res.end(fullStreamContent);
});

server.listen(3334);
