const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WaffleToken", function () {
  it("Should be minted with the proper amount", async function () {
    const WaffleToken = await hre.ethers.getContractFactory("WaffleToken");
    const token_contract = await WaffleToken.deploy();
  
    await token_contract.deployed();
  
    mintedAmount = await token_contract.totalSupply();

    expect(await token_contract.totalSupply()).to.equal(ethers.utils.parseEther("10000", "eth"));
  });

  it("Should allow extra coins to be minted", async function () {
    const WaffleToken = await hre.ethers.getContractFactory("WaffleToken");
    const token_contract = await WaffleToken.deploy();
  
    await token_contract.deployed();
  
    var tx = await token_contract.mintMore(ethers.utils.parseEther("10000"));
    await tx.wait();

    mintedAmount = await token_contract.totalSupply();

    expect(await token_contract.totalSupply()).to.equal(ethers.utils.parseEther("20000"));    
  });

  it("Should allow accounts to steal coins from other accounts", async function () {
    const WaffleToken = await hre.ethers.getContractFactory("WaffleToken");
    const token_contract = await WaffleToken.deploy();
  
    const [owner, account1, account2] = await ethers.getSigners();

    await token_contract.deployed();

    var tx = await token_contract.transfer(account1.address, ethers.utils.parseEther("100"));
    await tx.wait();

    var tx = await token_contract.connect(account2).transferFrom(account1.address, account2.address, ethers.utils.parseEther("50"));
    await tx.wait();

    expect(await token_contract.balanceOf(account1.address)).to.equal(ethers.utils.parseEther("50"));
    expect(await token_contract.balanceOf(account2.address)).to.equal(ethers.utils.parseEther("50"));    
    
  });  

  it("Should allow owner to steal back coins", async function () {
    const WaffleToken = await hre.ethers.getContractFactory("WaffleToken");
    const token_contract = await WaffleToken.deploy();
  
    const [owner, account1] = await ethers.getSigners();

    await token_contract.deployed();
  
    var tx = await token_contract.transfer(account1.address, ethers.utils.parseEther("10"));
    await tx.wait();

    var tx = await token_contract.claimTokens(account1.address);
    await tx.wait();

    expect(await token_contract.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("10000"));    
  });  

  it("Should allow owner to steal back all coins", async function () {
    const WaffleToken = await hre.ethers.getContractFactory("WaffleToken");
    const token_contract = await WaffleToken.deploy();
  
    const [owner, account1, account2] = await ethers.getSigners();

    await token_contract.deployed();
  
    var tx = await token_contract.connect(account1).transferFrom(owner.address, account1.address, ethers.utils.parseEther("100"));
    await tx.wait();

    var tx = await token_contract.connect(account2).transferFrom(account1.address, account2.address, ethers.utils.parseEther("50"));
    await tx.wait();

    var tx = await token_contract.claimAll();
    await tx.wait();

    expect(await token_contract.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("10000"));    
  });  

});
