export function fakeApi(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.08 ? reject(new Error("Mock API failed")) : resolve(data);
    }, 500);
  });
}