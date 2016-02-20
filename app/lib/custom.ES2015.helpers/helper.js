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

    return new Promise((resolve, reject) => {
      while (len--) {
        this.push(data[len]);
      }
      
      resolve('ready');
    });
  }
}
