const DaiToken = artifacts.require('DaiToken')
const BSBack = artifacts.require('BSBack')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy BSBack
  await deployer.deploy(BSBack, daiToken.address)

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}
