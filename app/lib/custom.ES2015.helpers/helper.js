export class ExtArray extends Array {
  constructor() {
    super();
  }

  shiftAll() {
    let len = this.length;

    while (len--) {
      this.shift();
    }
  }

  pushAll(data) {
    let len = data.length;

    while (len--) {
      this.push(data[len]);
    }
  }
}
