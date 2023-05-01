import { Chart } from "chart.js/auto";
import { ShowLoggedInUserInfo, DownloadProfilePic } from "./MyUtil";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { getStorage, ref as sRef} from "firebase/storage";
import { app } from "./firebaseinit";

const pieChart = document.getElementById('pieChart');
const barChart = document.getElementById('barChart');

var liqRatioSpan = document.querySelector("#liqRatioSpan");
var pendingEntrySpan = document.querySelector("#pendingEntrySpan");

const storage = getStorage();
const storageRef = sRef(storage, 'profilePic');

window.addEventListener("load", () => {
    console.log("Loaded dashboard page");
    DownloadProfilePic(storageRef);
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
    const pendingEntries = await GetPendingJournalEntryCount();

    MakeCharts(assetBal, liabilityBal);
    var ratio = (assetBal / liabilityBal);
    ColorRatioText(ratio);
    pendingEntrySpan.textContent = `${pendingEntries}`;
}

//query for approved = pending entries
async function GetPendingJournalEntryCount(){
    const dbRef = ref(getDatabase(app));
    const getPromise = await get(child(dbRef, 'Journal'));
    var count = 0;
    getPromise.forEach((child) => {
        if(child.val().Approved === "Pending"){
            count++;
        }
    });
    return count;
}
//create charts
function MakeCharts(assetBal, liabilityBal){
    new Chart(pieChart, {
        type: 'pie',
        data: {
            labels: [
                'Assets',
                'Liabilities',
              ],
              datasets: [{
                data: [assetBal, liabilityBal],
                backgroundColor: [
                    "#348937",
                    "#B53A34"
                ],
                hoverOffset: 4
              }]
        },
        options: {
        }
    });

    new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['Assets', 'Liabilities'],
            datasets: [{
                label: 'Dollar Amount',
                data: [assetBal, liabilityBal],
                backgroundColor: [
                    "#348937",
                    "#B53A34"
                  ],
                  borderColor: [
                    "#348937",
                    "#B53A34"
                  ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
//set liquidity value color
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

//return input account balance value
async function GetLedgerBalanceMatching(names){
    const dbRef = ref(getDatabase(app));
    var bal = 0;

    const getPromise = await get(child(dbRef, `Ledger`));

    getPromise.forEach((child) => {
        if (names.includes(child.key)) {
            bal += child.val().balance;
        }
    });

    return Math.abs(bal);
}
//get names of accounts matching type input
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