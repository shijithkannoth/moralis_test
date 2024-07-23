Feature: This is sample feature file to automate the moralis automation test task.
  This feature file used validate Create Node feature.

  Scenario Outline: Create a new node and verify the same
    Given I logged in and landed to dashboard page
    When I click on the create node button
    Then I select "<protocol>" and "<network>" from the dropdown
    Then I click on Create node and should see new node created
    Then I verify the API using the new node url
    Examples:
      | protocol | network |
      | Ethereum | Mainnet |

  Scenario: Test the negativve scre
    Given I logged in and landed to dashboard page
    Then I should be able to see the create new node page
