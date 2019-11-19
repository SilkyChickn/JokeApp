#!/bin/bash

# Install npm packages
echo "Installing required npm packages"
npm install
echo "npm packages installed"

# Run the react application
echo "Starting app"
npm run start

# Keep container running
tail -f /dev/null