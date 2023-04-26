import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "./firebaseinit";
import { ShowLoggedInUserInfo } from "./MyUtil";

var liqRatioSpan = document.querySelector("#liqRatioSpan");
var pendingEntrySpan = document.querySelector("#pendingEntrySpan");

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

    var ratio = (assetBal / liabilityBal);
    ColorRatioText(ratio);
}

function ColorRatioText(ratio){
    liqRatioSpan.textContent = ratio.toFixed(1);

    if(ratio < 1){
        liqRatioSpan.style.color = "#B53A34";
    } else if(ratio >= 1 && ratio < 2){
        liqRatioSpan.style.color = "#B59F00";
    } else{
        liqRatioSpan.style.color = "#348937";
    }
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