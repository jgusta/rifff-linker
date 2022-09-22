const checkId = function checkId(input:string):Promise<boolean> {
  console.log(`checkid run: ${input}`);
  return new Promise((res) => {
    const regex = /^[a-f0-9A-F]{32}$/;
    const check = input.match(regex);
    if (check == null) {
      res(false);
    }
    res(true);
  });
}
type Headers = {
  [key: string]: Array<string>
}
const headers:Headers = {
  "html": ["content-type", "text/html"],
  "css": ["content-type", "text/css"],
  "ico": ["content-type", "image/x-icon"]
};



export { headers, checkId}