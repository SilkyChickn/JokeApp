#!/bin/bash

# Install npm packages
echo "Installing required npm packages"
npm install --silent
npm install react-scripts@3.0.1 -g --silent
echo "npm packages installed"

# Run the react application
echo "Starting app"
npm start

# Keep container running
tail -f /dev/null