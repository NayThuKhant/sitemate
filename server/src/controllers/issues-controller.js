const express = require('express');
const router = express.Router();
const fs = require('fs');
const {validateCreateIssue, validateUpdateIssue} = require('../validators/issues-validator')

const issues = JSON.parse(fs.readFileSync('./data/issues.json', 'utf-8'));


router.post('/',validateCreateIssue, (req, res) => {
  const newIssue = req.body;

  console.log("Issue to be created: ", newIssue);

  res.json({'message': 'Created', 'data': newIssue});
});


router.get("/:id", (req, res) => {
	const issue = issues.find(issue => issue.id === parseInt(req.params.id));

	if (!issue) { res.status(404).json({'message': 'Not Found'})}

	res.json(issue);
});


router.put("/:id", validateUpdateIssue, (req, res) => {
	const issue = issues.find(issue => issue.id === parseInt(req.params.id));

	if (!issue) { res.status(404).json({'message': 'Not Found'})}

	const updatedIssue = req.body;

	console.log("Issue to be updated", updatedIssue);
	res.json({'message': 'Updated', 'data': updatedIssue});
});

router.delete("/:id", (req, res) => {
	const issue = issues.find(issue => issue.id === parseInt(req.params.id));

	if (!issue) { res.status(404).json({'message': 'Not Found'})}

	console.log("Issue to be deleted" , issue)
	res.json({'message': 'Deleted', 'data': issue});
});


module.exports = router;
