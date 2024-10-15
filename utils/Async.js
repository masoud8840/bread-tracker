module.exports = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(e=>{
    console.log("Error: ".red, e)
  });
};
