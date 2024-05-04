#!/usr/bin/env node

import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";

let userBalance = 30000;
let userPin = 4477;

console.log(`Pin for this account = ${userPin}`)
let pinRequired = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter Your Card Pin: ",
        type: "number",
    }
]);

if (pinRequired.pin === userPin) {
    let operations = await inquirer.prompt([
        {
            name: "ops",
            message: "Select The Options: ",
            type: "list",
            choices: ["Withdraw Cash", "Check Balance", "Fast Cash"],
        }
    ]);
    if(operations.ops === "Fast Cash"){
        let fcash = await inquirer.prompt([{
            name: "cashfast",
            message: "Select Your Amount: ",
            type : "list",
            choices: ["5000", "15000", "25000"]
        }
    ])
    console.log(fcash.cashfast);
    console.log(`You Withdrew: $ ${fcash.cashfast}`);
};
    if (operations.ops === "Withdraw Cash") {
        let cash = await inquirer.prompt([
            {
                name: "reqcash",
                message: "Enter The Amount: ",
                type: "number",
            }
        ]);
        if (cash.reqcash > userBalance) {
            console.log("Insufficient Balance! Please Check Your Balance And Try Again.");
        }
        else{
            let notes = await inquirer.prompt([{
                    name: "currency",
                    message: "Select The Currency (Use Space To Select And Then Press Enter): ",
                    type: "checkbox",
                    choices: ["Coins", "10", "100", "500"],
                }
            ]);
            console.log("You Withdrew: $", cash.reqcash);
            console.log("Currency Medium: ", notes.currency);
            console.log("Your Remaining Balance Is: $", userBalance -= cash.reqcash);
        }
    }
    else if (operations.ops === "Check Balance") {
        console.log("Your Current Balamce Is: $", userBalance);
    }
}

else {
    console.log("Enter Correct Pincode");
}