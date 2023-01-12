import { Readable, Writable, Transform } from 'node:stream';

// process.stdin.pipe(process.stdout)

//Stream de leitura
class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer)
      }
    }, 1000)
  }
}

// Stream que transforma
class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(number)));
  }
}

// Stream de escrita
class MultiplyByStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByStream());
