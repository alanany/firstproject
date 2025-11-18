const {body}=require('express-validator');
const validatorSchema=()=>async()=>{
  console.log("validatorSchema",body('name'));
    return await [ body('name').notEmpty()
          .withMessage('name is required')
          .isLength({min:3}).withMessage('name should be at least 3 characters long'),
            // validator. body('id').notEmpty()
            // .withMessage('id is required')
            // .isLength({min:3}),
        ]
}
module.exports=validatorSchema;