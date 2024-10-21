//created a function name catchAsyncErrors which accept a funnction
// name theFunction as a Parameter and return itself and give threee parameter which is request respond and next
const catchAsyncErrors = theFunction => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next); //accept as a promis and try to resolve
  }; //if happen then success otherwise it catch the error inside it and run the function which is a step forward form it
};
module.exports = {
  catchAsyncErrors,
};
