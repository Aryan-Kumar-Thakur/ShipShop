const catchAsyncError = (thefn) => (req,res,next)=>{
    Promise.resolve(thefn(req,res,next)).catch(next);
}

export default catchAsyncError