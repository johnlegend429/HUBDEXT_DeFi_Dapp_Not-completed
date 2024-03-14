import { all, create } from "mathjs";

export class MathService {
  private math = create(all, {
    number: "BigNumber",
    precision: 64,
  });

  toBigNumber(value: any) {
    return this.math.bignumber(value);
  }

  toHumanValue(amount: string | bigint, decimals: number | bigint): string {
    return this.math.bignumber(amount.toString())
      .dividedBy(this.math.bignumber(10).pow(this.math.bignumber(decimals.toString())))
      .toFixed();
  }

  // toBlockchainValue(amount: string | bigint, decimals: number | bigint): string {
  //   return this.math.format(
  //     this.math
  //       .chain(this.math.bignumber(amount.toString()))
  //       .multiply(this.math.bignumber(10).pow(this.math.bignumber(decimals.toString())))
  //       .done(),
  //     { notation: "fixed" }
  //   );
  // }

  toInternationalCurrency(amount: string | bigint): string {
    return (
      Math.abs(Number(amount)) >= 1.0e9
        ? (Math.abs(Number(amount)) / 1.0e9).toFixed(2) + "B"
        : Math.abs(Number(amount)) >= 1.0e6
          ? (Math.abs(Number(amount)) / 1.0e6).toFixed(2) + "M"
          : Math.abs(Number(amount)) >= 1.0e3
            ? (Math.abs(Number(amount)) / 1.0e3).toFixed(2) + "K"
            : Math.abs(Number(amount))
    ).toString();
  }
}
