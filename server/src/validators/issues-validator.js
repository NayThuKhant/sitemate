const { body, validationResult } = require('express-validator');


exports.validateCreateIssue = [
  body('id').notEmpty().withMessage('Id is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


exports.validateUpdateIssue = [
	body('id').notEmpty().withMessage('Id is required'),
	body('title').notEmpty().withMessage('Title is required'),
	body('description').notEmpty().withMessage('Description is required'),

	(req, res, next) => {
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
	  next();
	}
  ];
