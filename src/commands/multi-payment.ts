import Command, { flags } from "@oclif/command";

import { CommandFlags } from "../types";
import { buildTransaction, processCommand, sharedFlags } from "../utils";

export class MultiPayment extends Command {
    public static description = "Generate a Type 6 transaction";

    public static examples: string[] = [];

    public static flags: CommandFlags = {
        ...sharedFlags,
        payments: flags.string({
            default: "AHXtmB84sTZ9Zd35h9Y1vfFvPE2Xzqj8ri,1;AZFEPTWnn2Sn8wDZgCRF8ohwKkrmk2AZi1,2",
        }),
    };

    public async run(): Promise<void> {
        const { flags } = this.parse(MultiPayment);

        processCommand(flags, () =>
            buildTransaction(flags, "multiPayment", builder => {
                for (const payment of (((flags.payments as string) as unknown) as string).split(";")) {
                    const [address, amount] = payment.split(",");

                    builder.addPayment(address, amount);
                }
            }),
        );
    }
}
