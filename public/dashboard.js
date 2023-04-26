import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "./firebaseinit";
import { ShowLoggedInUserInfo } from "./MyUtil";

window.addEventListener("load", () => {
    console.log("Loaded dashboard page");
    ShowLoggedInUserInfo();
    CalcLiquidityRatio();
});

async function CalcLiquidityRatio() {
    /*
    Step 1. Get an array of asset account names and liability account names.
    Step 2. Compare the ledger account names to the asset and liquidity account names.
    Step 3. For a match, add the bal in that account to the according var.
    Step 4. Divide the asset var by the liability var.
    */
    const assetAcctNames = await GetAccountNamesMatching("Asset");
    const liabilityAcctNames = await GetAccountNamesMatching("Liability");

    const assetBal = await GetLedgerBalanceMatching(assetAcctNames);
    const liabilityBal = await GetLedgerBalanceMatching(liabilityAcctNames);

    console.log((assetBal / liabilityBal).toFixed(1));
}

async function GetLedgerBalanceMatching(names){
    const dbRef = ref(getDatabase(app));
    var bal = 0;

    const getPromise = await get(child(dbRef, `MyLedger`));

    getPromise.forEach((child) => {
        if (names.includes(child.key)) {
            bal += child.val().balance;
        }
    });

    return Math.abs(bal);
}

async function GetAccountNamesMatching(type) {
    const dbRef = ref(getDatabase(app));

    var names = [];

    const getPromise = await get(child(dbRef, `COA`));

    getPromise.forEach((child) => {
        if (child.val().Type === type) {
            names.push(child.val().Title);
        }
    });

    return names;
}