#!/usr/bin/env node
// this line above allows the script to be run as a CLI tool

import fs from 'fs/promises';
// fs/promises is used for promise-based file system operations

const language = process.argv.slice(2)[0] || 'en';
// get the language argument from command line, default to 'en'

if (!language) {
  console.error('Please provide a language code (e.g., en, es, fr).');
  process.exit(1);
}

const url = `https://www.toptal.com/developers/gitignore/api/${language}`;
// construct the URL for fetching the .gitignore template

async function main () {
  try {
    const response = await fetch(url);
    // fetch the .gitignore template from the URL
    if (!response.ok) {
      throw new Error(`Failed to fetch .gitignore template: ${response.statusText}`);
    }

    const data = await response.text();
    // read the response as text
    
    await fs.writeFile('.gitignore', data);
    // write the fetched data to a .gitignore file

    console.log(".gitignore file created successfully.");
    } catch (error) {
      console.error("Error creating .gitignore file:", error);
      process.exit(1);
    }
  }

main();