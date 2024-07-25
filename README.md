# moralis_test
This repo is sample automation framework for GUI and API testing using playwright cucumber and Load testing using K6.

## Tool and Technologies:

    1. Playwright
    2. Cucumber
    3. Typescript


## Dependencies:
    To run the automation testing we need the npm and node installed >20
    To run the UI test default browser google chrome/chromium should be available

## setup
    npm install
## Report:
    html report is generated with screenshots for failed cases under test-results folder    

## About the Setup
    You need to create .env file and update the below details
        USERNAME = shijith.ssn@gmail.com
        PASSWORD = YourPassword
        URL = https://admin.moralis.io/    

## K6 Load Testing  
## Running the test
    k6 run nft.js --out json=output.json --env API_KEY="your api key"
### Results:
    html report is generated in the k6 directory (tests/k6/summary.html)      
    