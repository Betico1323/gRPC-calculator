import { InteractiveCommand, InteractiveOption } from "interactive-commander";
import { operate } from './client.js'

const program = new InteractiveCommand();

program
    .command("operar")
    .addOption(
        new InteractiveOption("-o, --operation <operation>", "operation")
            .choices(["add", "subtract", "multiply", "divide"])
    )
    .addOption(
        new InteractiveOption("-n1, --number1 <number>", "First number").argParser(Number)
    )
    .addOption(
        new InteractiveOption("-n2, --number2 <number>", "Second number").argParser(Number)
    )
    .action(async (_options, cmd) => {
        const { operation, number1, number2 } = cmd.opts()
        try {
            const result = await operate(operation, number1, number2)
            console.log('Result: ', result);
        } catch (err) {
            console.log("Failed operation: ", err.details);
        }
    });


await program
    // Enables interactive mode (when -i or --interactive is passed in)
    // This should almost always be called on the root command right before
    // calling parseAsync
    .interactive("-i, --interactive", "interactive mode")
    .parseAsync(process.argv);