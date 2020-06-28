exports.signupvalidator=((req,res,next) =>{
    req.check("name","Name is Required").notEmpty();
    req.check("email","Email is required")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must conatian @")
    .isLength({
        min :4,
        max:32
    })
    req.check("password","Password is required").notEmpty
    req.check("password")
    .isLength({
        min :6,
    })
    .matches(/\d/)
    .withMessage("Password must conatian a digit")
    const errors = req.validationErrors()
    if (errors){
        const firsterror = errors.map(error => error.msg )[0]
        res.status(400).json({error:firsterror})
    }
    next()
})