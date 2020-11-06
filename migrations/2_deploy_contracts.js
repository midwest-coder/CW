const DaiToken = artifacts.require('DaiToken')
const BSBack = artifacts.require('BSBack')

module.exports = async function(deployer, network) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken, { gas: 5000000 })
  const daiToken = await DaiToken.deployed()

  // Deploy BSBack
  await deployer.deploy(BSBack, daiToken.address, { gas: 5000000 })

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer("0x030a2fDC69431eD2b96E9651B0e10AD12a231638" , '100000000000000000000')
}
