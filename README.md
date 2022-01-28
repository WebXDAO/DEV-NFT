# DEV-NFT [![Stake to support us](https://badge.devprotocol.xyz/0x803854e0676cd5892f6100eb452551D22e9c38ec/descriptive)](https://stakes.social/0x803854e0676cd5892f6100eb452551D22e9c38ec)

This project aims for [Buidl it](https://buidlit.polygon.technology/) & [Dev Dapp Starter Grant](https://www.notion.so/Welcome-to-DEV-DAPP-STARTER-GRANTS-5cb95252f18540258111581ea54d8808)

# Hackathon results

This project won 2 prizes for [Buidl it](https://devfolio.co/submissions/devnft-210b) hackathon 🏆 :

<img width="1259" alt="" src="https://user-images.githubusercontent.com/50140834/147484853-81c5bae0-8a8a-40d8-bdcb-f50b795f59d1.png">

Check the project submission [here](https://devfolio.co/submissions/devnft-210b)!

# Network

We are currently on mumbai testnet. 
To use DevNFT you need to setup mumbai testnet network on metamask. 
- Go to metamask settings > add network > 
- NetworkName: 	Mumbai
- chainId:	80001
- Gas Token:	MATIC Token
- Rpc url: https://matic-mumbai.chainstacklabs.com
- blockscan: https://mumbai.polygonscan.com/

![image](https://user-images.githubusercontent.com/57281769/145784891-9902e059-59e8-442f-8ce1-ed7af6108784.png)

To mint NFT you need test matic 
- Take them from : https://faucet.polygon.technology/

Tools we are using
- IPFS infura node
- Contract templates by [Nader Dabit](https://github.com/dabit3)
- Nextjs for building Client
- Hardhat for abi generation

# Environment Variables

For local development, developers need to create environment variables in .env file. If you are not familiar with environment variables, here is a great [article](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786) explaining it.

1. To define permanent environment variables in this project, create a file called .env in the root of your project with following variables:

```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

2. You need to obtain your own Github Client ID and Secret Key for OAuth authentication for the app which would also be assigned to 'GITHUB_CLIENT_ID' and 'GITHUB_CLIENT_SECRET' variable above. If you want to understand further about client ID and Secret Key, as well as OAuth authentication, please read this [document](https://docs.github.com/en/rest/guides/basics-of-authentication).

  - You need to first register your app to obtain your Client ID and Secret Key. Click [here](https://github.com/settings/applications/new) to begin.
  - Fill in the information as shown below and click "Register application" button to proceed.
   
<img width="985" alt="Register Application example" src="https://user-images.githubusercontent.com/38476995/151486332-b9223452-91ef-4b45-b96f-686db5015361.png">
 
   - There you have it. Your client ID and client secret keys come from your application's configuration page. You should never, ever store these values in GitHub or any other public place, for that matter. We recommend storing them as environment variables which is exactly what we've done here.
  
<img width="788" alt="Client ID and Secret Key example" src="https://user-images.githubusercontent.com/38476995/151487977-44958f32-bfdb-4efe-945a-0a428f6d5dcb.png">

3. Double check .gitignore file and make sure .env is listed as shown below.

     <img width="386" alt="gitignore file example" src="https://user-images.githubusercontent.com/38476995/151290850-9cfe4b8d-d2db-4a90-a5e8-5f5e2f910706.png">
