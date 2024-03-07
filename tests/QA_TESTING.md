## App Homepage (disconnected)

https://app.staging.fractalframework.xyz/

### General

- [ ] **Version number is the expected version**
- [ ] App icon links to App Homepage
- [ ] FAQ, Discord, Docs links in sidebar are correct
- [ ] Sidebar language toggle works
- [ ] Favorites menu appears and displays favorites
- [ ] Favorites link to their respective DAO homepage
- [ ] _Connect Wallet dropdown_ -> _Connect_ opens Connect a Wallet modal
- [ ] _Connect Wallet dropdown_ shows default network (Sepolia)
- [ ] _Connect your wallet_ in page content opens Connect a Wallet modal
- [ ] FAQ, Discord, Docs links in page content are correct
- [ ] no DAO related sidebar icons appear

### Search

- [ ] arbitrary text search returns invalid Eth address message
- [ ] nonexistant ENS search returns invalid Eth address message
- [ ] personal wallet address (EOA) search (0x123..) gives invalid Fractal / Safe message
- [ ] personal ENS address search (mike.eth) gives invalid Fractal / Safe message
- [ ] Safe address search gives link to DAO message
- [ ] Safe ENS search gives link to DAO message

## App Homepage (connected)

https://app.staging.fractalframework.xyz/

click _Connect your wallet_ -> _MetaMask_ and connect your wallet

### With Personal Wallet Address (0x123..)

- [ ] top right wallet menu is labeled with truncated address
- [ ] opening wallet menu displays truncated address
- [ ] wallet menu address click copies address to clipboard
- [ ] wallet menu generated user image links to Etherscan
- [ ] wallet menu displays **connected** network (Sepolia)
- [ ] wallet menu Disconnect button disconnects the wallet
- [ ] Create a Fractal button in page content links to DAO creation flow

### With Personal ENS Address

- [ ] top right wallet menu is labeled with ENS image / name
- [ ] opening wallet menu displays ENS name / image

## Create a DAO

https://app.staging.fractalframework.xyz/create

### Step 1: Establish Essentials

- [ ] trash icon returns user to the App Homepage
- [ ] Fractal name accepts any text
- [ ] Name is required to enable Next
- [ ] user can select between Safe / Token Voting options
- [ ] Next links to _Configure Multisig_ OR _Configure Voting Token_

### Step 2: Configure Multisig

From Step 1: _enter a name_ -> _select Multisig_ -> _Next_

- [ ] Prev button returns user to Establish Essentials
- [ ] Total Signers must be greater than 0 and less than 100
- [ ] Signature Threshold must be greater than 0 and less than 100
- [ ] Signature Threshold must be less than or equal to Total Signers
- [ ] Signer Addresses inputs do not allow duplicate addresses
- [ ] Signer Addresses trash icon deletes the input row and decrements Total Signers
- [ ] Signer Addresses inputs are required to enable Deploy button
- [ ] Deploy button initiates a transaction to deploy the DAO

### Step 2: Configure Voting Token

From Step 1: _enter a name_ -> _select Voting Token_ -> _Next_

- [ ] Prev button returns user to Establish Essentials
- [ ] Token Name accepts any text
- [ ] Token Symbol accepts any text 2-6 characters
- [ ] Token Supply accepts number with up to 18 decimals
- [ ] Allocation address input accepts Eth address or valid ENS
- [ ] Allocation amount accepts numbers with up to 18 decimals
- [ ] Add Allocation button adds a new allocation row
- [ ] Delete button deletes the allocation row
- [ ] totals from Amount fields must be less than or equal to Token Supply
- [ ] All Allocation rows are required to enable Next
- [ ] Next button links to _Compose Governance_

### Step 3: Compose Governance

From Step 2: _enter Token Name / Symbol / Supply_ -> _enter allocation Address / Amount_ -> _Next_

- [ ] Prev button returns user to Configure Voting Token
- [ ] Voting Period accepts any whole number
- [ ] Quorum accepts any whole number
- [ ] Timelock Period accepts any whole number
- [ ] All fields are required to enable Deploy button
- [ ] Deploy button initiates a transaction to deploy the DAO

## DAO Home (Token Voting)

https://app.staging.fractalframework.xyz/daos/{address}

### Sidebar

- [ ] DAO Home is highlighted
- [ ] DAO Hierarchy links to the DAO hierarchy
- [ ] Proposals links to the DAO proposals
- [ ] Treasury links to the DAO treasury

### DAO Details

- [ ] DAO name is displayed
- [ ] clicking DAO address copies it to clipboard
- [ ] Favorite icon toggles favorite status of the DAO
- [ ] Manage DAO menu contains Add a subDAO option
- [ ] Governace card displays Token Voting governance details
- [ ] Proposals card displays Pending / Passed counts
- [ ] Proposals card links to Proposals
- [ ] Treasury card displays total USD value
- [ ] Treasury card links to Treasury

### Proposals List

- [ ] Proposals are displayed
- [ ] Newest / Oldest toggle list by creation date
- [ ] Details button links to the Proposal Details
- [ ] State filter filters by Proposal states (Active, Timelocked, Executable, Executed, Failed)

## DAO Hierarchy (Token Voting)

https://app.staging.fractalframework.xyz/daos/{address}/hierarchy

- [ ] DAO Hierarchy is highlighted in sidebar
- [ ] DAO name links to DAO homepage
- [ ] DAO card name links to DAO homepage
- [ ] DAO card address copies address to clipboard
- [ ] Manage DAO menu contains Add a subDAO option on parent DAO
- [ ] Manage DAO menu contains Add a subDAO and Initiate Freeze options on subDAOs
- [ ] subDAO name links to subDAO's homepage

## Proposals (Token Voting)

https://app.staging.fractalframework.xyz/daos/{address}/proposals

### General

- [ ] Proposals is highlighted in sidebar
- [ ] DAO name links to DAO homepage
- [ ] Delegate button appears IF connected address is a token holder
- [ ] Create button links to Proposal creation flow
- [ ] TODO more here

### Delegate Modal

- [ ] token balance is shown
- [ ] Delegated To is shown (who connected address delegates their tokens to)
- [ ] Delegate to Self copies connected address into input field
- [ ] Delegate Address field accepts any address or valid ENS
- [ ] Delegate Address is required to enable Delegate button
- [ ] Delegate Voting Tokens button initiates transaction to delegate and closes the modal

## Treasury (Token Voting)

https://app.staging.fractalframework.xyz/daos/{address}/treasury

### General

- [ ] Treasury is highlighted in sidebar
- [ ] DAO name links to DAO homepage
- [ ] Transactions list displays incoming / outgoing assets
- [ ] Transaction amount links to transaction in Etherscan
- [ ] Transaction address links to address in Etherscan
- [ ] Assets list displays total USD balance of ERC-20 tokens
- [ ] Assets list displays list of ERC-20 tokens
- [ ] ERC-20 Asset displays USD value, if applicable
- [ ] ERC-20 Asset Allocation displays percentage of total USD
- [ ] Assets list displays list of ERC-721 tokens
- [ ] Send Assets button appears ONLY if connected address is a delegated token holder

### Send Assets

- [ ] Clicking X or outside modal dismisses the modal
- [ ] Select Asset dropdown lists ERC-20 tokens
- [ ] How Much? accepts any number greater than 0 or less than available selected token balance
- [ ] Recipient accepts any Eth address or valid ENS
- [ ] Amount and recipient required to enable Submit button
- [ ] Submit Proposal button initiates transaction to create a Proposal

## Templates (Token Voting)

https://app.staging.fractalframework.xyz/daos/{address}/ ???? TODO

### General

- [ ] Templates is highlighted in sidebar
- [ ] TODO

## Proposal Details (Token Voting)

- [ ] TODO

## Proposal Creation (Token Voting)

https://app.staging.fractalframework.xyz/daos/{address}/proposals/new

### Step 1: Proposal Metadata

- [ ] Voting Period, Quorum, Timelock appear under Proposal Details
- [ ] Proposal Title accepts any text
- [ ] Proposal Description accepts any text
- [ ] Additional Resources accepts a full URL
- [ ] No fields are required
- [ ] Next links to transaction builder

### Step 2: Transaction Builder

- [ ] Prev links to Proposal Metadata
- [ ] Target Address accepts any Eth address or valid ENS
- [ ] Function Name accepts any alpha numeric text (no spaces)
- [ ] Function Signature accepts only valid parameter types list
- [ ] Parameters accepts only valid parameters list
- [ ] ETH Value accepts any number up to 18 decimal places
- [ ] Target Address, Function Name required to enable Create Proposal
- [ ] Add Transaction adds another transaction builder component
- [ ] Trash icon deletes the selected builder component
- [ ] Create Proposal button initiates transaction to create the proposal

## SubDAO Creation (Token Voting)

https://app.staging.fractalframework.xyz/daos/{parentAddress}/new

### General

- [ ] All aspects of [Create a DAO](#create-a-dao)
- [ ] Advanced appears in Configure Voting Token
- [ ] Parent token holder claiming accepts any number up to 18 decimal places
- [ ] Parent token holder amount included in total allocation calculation to enable Next

### Step 4: Configure Parent Controls

- [ ] Prev button returns user to Compose Governance
- [ ] Execution Period accepts any whole number
- [ ] Freeze Votes Threshold accepts any whole number
- [ ] Freeze Proposal Period accepts any whole number
- [ ] Freeze Period accepts any whole number
- [ ] All fields required to enable Create button
- [ ] Create subDAO Proposal initiates transaction to submit proposal

## Freeze Voting

- [ ] TODO

## Token Claim

- _Create a subDAO Proposal_
- _During subDAO creation, add token claim amount in Advanced_
- _Pass the Proposal_

- [ ] Blue Claim component does NOT appear on the DAO homepage for a connected non token holder
- [ ] Blue Claim component DOES appear on the DAO homepage for a connected token holder
- [ ] Claim button initiates a transaction which immediately claims tokens for the caller

## Clawback

- _Initiate a Freeze on a subDAO_

- [ ] Initiate Clawback option does NOT appear in the Manage DAO menu of the subDAO's homepage for NON rootDAO delegated token holders
- [ ] Initiate Clawback option DOES appear in the Manage DAO menu of the subDAO's homepage for rootDAO delegated token holders
- [ ] Initiate Clawback creates a Proposal on the rootDAO called Clawback Proposal
- [ ] Passing the Clawback Proposal on the rootDAO transfers all ERC20 tokens from the subDAO to the rootDAO

## DAO Home (Multisig)

https://app.staging.fractalframework.xyz/daos/{address}

- [ ] Governace card displays Multisig governance details
- [ ] Proposals card displays Pending / Passed counts

## Manage Signers (Multisig)

https://app.staging.fractalframework.xyz/daos/{address}/settings

- [ ] List of current signers appears
- [ ] DAO Details displays correct signers required
- [ ] Remove highlights when user is selected
- [ ] Remove modal creates remove signer proposal
- [ ] Add modal creates add signer proposal
- [ ] Add modal does not allow you to add an existing signer again

## TODO more multisig specific stuff
