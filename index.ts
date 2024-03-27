#!/usr/bin/env node

import inquirer from "inquirer";

let userBalance = 25000;
let userPin = 4477;
let pinRequired = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter you card pin: ",
        type: "number",
    }
]);

if (pinRequired.pin === userPin) {
    let operations = await inquirer.prompt([
        {
            name: "ops",
            message: "Select the options: ",
            type: "list",
            choices: ["Withdraw Cash", "Check Balance"],
        }
    ]);
    if (operations.ops === "Withdraw Cash") {
        let cash = await inquirer.prompt([
            {
                name: "reqcash",
                message: "Enter the amount: ",
                type: "number",
            }
        ]);
        if (cash.reqcash > userBalance) {
            console.log("Insufficient balance! Please check your balance and try again.");
        }
        else {
            let notes = await inquirer.prompt([{
                    name: "currency",
                    message: "Select the currency",
                    type: "checkbox",
                    choices: ["500", "1000", "5000"],
                }
            ]);
            console.log("You withdrew: $", cash.reqcash);
            console.log("Currency medium: ", notes.currency);
            console.log("Your remaining balance is: $", userBalance -= cash.reqcash);
        }
    }
    else if (operations.ops === "Check Balance") {
        console.log("Your current balamce is: $", userBalance);
    }
}

else {
    console.log("Enter Correct Pincode");
}