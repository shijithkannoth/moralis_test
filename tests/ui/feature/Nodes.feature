Feature: This is sample feature file to automate the moralis automation test task.
  This feature file used validate Create Node feature.

  Scenario Outline: Create a new node and verify the API endpoints using the node url.
    Given I logged in and landed to dashboard page
    When I click on the create node button
    Then I select "<protocol>" and "<network>" from the dropdown
    Then I click on Create node and should see new node created
    Then I verify the API using  "<id>" "<method>" new node url
    Then I validate the getTransactionByHash endpoint with new node url
    Then I validate the blockNumber endpoint with newly created node
    Then I validate the API with inputs

    Examples:
      | protocol | network | id | method               |
      | Ethereum | Mainnet | 1  | eth_getBlockByNumber |

  Scenario: Validate the NFT API endpoint with API KEY from UI
    Given I logged in and landed to dashboard page
    Then I get the API Key from portal
    Then I validate the getNFTWallet endpoint

  Scenario: Validate the NFT endpoints with incorrect paramaeters
    Given I logged in and landed to dashboard page
    Then I get the API Key from portal
    Then I request NFT endpoint with incorrect address to validate response address not valid
    Then I request NFT endpoint with incorrect apieky to validate inorrect token in response messsage

  Scenario: Validate the endpoints ((blockNumber, getBlockByNumber, getTransactionByHash) with incorrect data
    Given I get the api key from node url
    Then I validate blockNumber endpoint with incorrect inputs
    Then I validate getTransactionByHash endpoint with incorrect inputs
    Then I validate getBlockByNumber endpoint with incorrect inputs





