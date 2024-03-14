import Web3 from "web3";
import { MathService } from "./math";
import { ethers } from "ethers";

export class WalletService {
  static Web3Instance: any;

  private web3ReadOnly: any;
  static EthersInstance: any;

  constructor(private math: MathService) {
  }

  getWeb3(): any {
    return WalletService.Web3Instance;
  }

  getReadOnlyWeb3(): any {
    if (!this.web3ReadOnly) {
      this.web3ReadOnly = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_ETH_NODE!)
      );
    }
    return this.web3ReadOnly;
  }

  async on(event: string, handler: (accounts: string[]) => void) {
    return this.getWeb3().provider.on(event, handler);
  }

  /*   async correctNetwork(): Promise<boolean> {
      const networkId = await this.getWeb3().eth.net.getId();
      if (process.env.NODE_ENV === "production") {
        if (networkId === 1) {
          return true;
        }
        return false;
      } else {
        if (networkId === 5) {
          return true;
        }
        return false;
      }
    } */

  async correctNetwork(): Promise<boolean> {
    const networkId = await this.getWeb3().eth.net.getId();
    return Number(process.env.REACT_APP_CHAIN_ID) === Number(networkId);

  }

  async getConnectedWallet(): Promise<string | null> {
    const web3 = this.getWeb3();
    if (!web3) {
      return null;
    }
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      return null;
    }
    return accounts[0];
  }

  getVestingContract(address: string, readonly?: boolean): any {
    const abi = require("../abis/vesting.json");

    if (readonly) {
      return new (this.getReadOnlyWeb3().eth.Contract)(abi, address);
    }
    return new (this.getWeb3().eth.Contract)(abi, address);
  }

  getSaleContract(address: string, readonly?: boolean): any {
    const abi = require("../abis/sale.json");

    if (readonly) {
      return new (this.getReadOnlyWeb3().eth.Contract)(abi, address);
    }
    return new (this.getWeb3().eth.Contract)(abi, address);
  }

  getTokenContract(address: string, readonly?: boolean): any {
    const abi = require("../abis/token.json");

    if (readonly) {
      return new (this.getReadOnlyWeb3().eth.Contract)(abi, address);
    }
    return new (this.getWeb3().eth.Contract)(abi, address);
  }

  async getTokenTicker(tokenAddress: string): Promise<string> {
    const contract = await this.getTokenContract(tokenAddress, true);
    return await contract.methods.symbol().call();
  }

  async claimFromVesting(vestingAddress: string, scheduleId: string): Promise<void> {
    const contract = await this.getVestingContract(vestingAddress, false);
    await contract.methods
      .release(scheduleId, await contract.methods.computeReleasableAmount(scheduleId).call())
      .send({ from: await this.getConnectedWallet() });
  }

  async getClaimedFromVesting(vestingAddress: string, scheduleId: string): Promise<number> {
    const contract = await this.getVestingContract(vestingAddress, true);
    return (await contract.methods.getVestingSchedule(scheduleId).call() as { released: number }).released;
  }

  async getVestingClaim(saleAddress: string): Promise<number[]> {
    const contract = await this.getSaleContract(saleAddress, true);

    return (await contract.methods.getVestingClaim().call()).map(
      (val: string) => parseInt(val, undefined)
    );
  }

  /*   async buyTokens(saleAddress: string, amount: string): Promise<void> {
      if (!(await this.correctNetwork())) {
        alert("Connect to ETH network first!");
        throw new Error("Connect to ETH network first!");
      }

      await this.getWeb3().eth.sendTransaction({
        from: await this.getConnectedWallet(),
        to: saleAddress,
        value: this.math.toBlockchainValue(amount, 18),
      });
    } */
  async buyTokens(saleAddress: string, amount: string): Promise<void> {
    if (!(await this.correctNetwork())) {
      alert("Connect to ETH network first!");
      throw new Error("Connect to ETH network first!");
    }

    try {
      const params = [
        {
          from: await this.getConnectedWallet(),
          to: saleAddress,
          value: ethers.utils.parseEther(amount).toHexString(),
        },
      ];
      await WalletService.EthersInstance.send("eth_sendTransaction", params);
    } catch (e) {
      throw e;
    }
  }

  async claim(saleAddress: string): Promise<void> {
    if (!(await this.correctNetwork())) {
      alert("Connect to ETH network first!");
      throw new Error("Connect to ETH network first!");
    }

    const contract = await this.getSaleContract(saleAddress, false);
    await contract.methods
      .claim()
      .send({ from: await this.getConnectedWallet() });
  }

  async refund(saleAddress: string): Promise<void> {
    if (!(await this.correctNetwork())) {
      alert("Connect to ETH network first!");
      throw new Error("Connect to ETH network first!");
    }

    const contract = await this.getSaleContract(saleAddress, false);
    await contract.methods
      .refund()
      .send({ from: await this.getConnectedWallet() });
  }

  async getClaimableTokens(saleAddress: string, decimals: number): Promise<string> {
    const contract = await this.getSaleContract(saleAddress, true);
    const wallet = await this.getConnectedWallet();
    const claimable = await contract.methods.getClaimableTokens(wallet).call();

    return this.math.toHumanValue(claimable, decimals);
  }

  async getPendingClaimable(saleAddress: string, decimals: number): Promise<string> {
    const contract = await this.getSaleContract(saleAddress, true);
    const pendingClaimable = await contract.methods
      .pendingClaimable(await this.getConnectedWallet())
      .call();

    return this.math.toHumanValue(pendingClaimable, decimals);
  }

  async getClaimedTokens(saleAddress: string, decimals: number): Promise<string> {
    const contract = await this.getSaleContract(saleAddress, true);
    const claimed = await contract.methods.claimedTokens(await this.getConnectedWallet()).call();

    return this.math.toHumanValue(claimed, decimals);
  }

  async alreadyRefunded(saleAddress: string): Promise<number> {
    const contract = await this.getSaleContract(saleAddress, true);
    return parseInt(
      await contract.methods
        .participants(await this.getConnectedWallet())
        .call(),
      undefined
    );
  }

  async getClaimTiming(saleAddress: string): Promise<number> {
    const contract = await this.getSaleContract(saleAddress, true);
    return parseInt(await contract.methods.claimTiming().call(), undefined);
  }

  async getClaimCliffTime(saleAddress: string): Promise<number> {
    const contract = await this.getSaleContract(saleAddress, true);
    return parseInt(await contract.methods.claimCliffTime().call(), undefined);
  }

  getPercentageCollected(collected: string, hardcap: string): number {
    return this.math.toBigNumber(collected).times(this.math.toBigNumber(100)).dividedBy(hardcap).toNumber();
  }

  async getTokenDecimals(tokenAddress: string): Promise<number> {
    const tokenContract = await this.getTokenContract(tokenAddress, true);
    return await tokenContract.methods.decimals().call();
  }

  async isWhitelisted(saleAddress: string): Promise<"PUBLIC" | "PRIVATE"> {
    const contract = await this.getSaleContract(saleAddress, true);
    const _isWhitelisted = await contract.methods.whitelistEnabled().call();
    return _isWhitelisted ? "PRIVATE" : "PUBLIC";
  }

  async walletWhitelisted(saleAddress: string, wallet: string): Promise<boolean> {
    const contract = await this.getSaleContract(saleAddress, true);
    return contract.methods.getWhitelistStatus(wallet).call();
  }
}
