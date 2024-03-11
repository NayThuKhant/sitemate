const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const baseUrl = 'http://localhost:3000/api';

function prompt(message) {
  return new Promise(resolve => {
    rl.question(message, answer => {
      resolve(answer.trim());
    });
  });
}

async function createIssue() {
  const id = await prompt('Enter issue id: ');
  const title = await prompt('Enter issue title: ');
  const description = await prompt('Enter issue description: ');

  const response = await fetch(`${baseUrl}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, title, description })
  });
  const data = await response.json();
  console.log(data);
}

async function readIssue() {
  const id = await prompt('Enter issue ID: ');

  const response = await fetch(`${baseUrl}/issues/${id}`);
  if (response.status === 404) {
    console.log('Issue not found');
    return;
  }
  const data = await response.json();
  console.log(data);
}

async function updateIssue() {
  const id = await prompt('Enter issue ID: ');
  const title = await prompt('Enter updated issue title: ');
  const description = await prompt('Enter updated issue description: ');

  const response = await fetch(`${baseUrl}/issues/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, title, description })
  });
  const data = await response.json();
  console.log(data);
}

async function deleteIssue() {
  const id = await prompt('Enter issue ID: ');

  const response = await fetch(`${baseUrl}/issues/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log(data);
}

async function main() {
  console.log('Choose an option:');
  console.log('1. Create Issue');
  console.log('2. Read Issue');
  console.log('3. Update Issue');
  console.log('4. Delete Issue');
  console.log('5. Exit');

  const option = await prompt('Enter your choice: ');

  switch (option) {
    case '1':
      await createIssue();
      break;
    case '2':
      await readIssue();
      break;
    case '3':
      await updateIssue();
      break;
    case '4':
      await deleteIssue();
      break;
    case '5':
      console.log('Exiting...');
      process.exit(0);
    default:
      console.log('Invalid option');
  }

  main();
}

main();
