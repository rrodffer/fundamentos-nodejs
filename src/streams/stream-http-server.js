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

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumber())
    .pipe(res)
});

server.listen(3334);
