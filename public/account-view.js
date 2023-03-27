//Updates the title based on which account the user navigated from.
document.querySelector("#accountViewHeader").innerHTML = window.sessionStorage.getItem("accountAnchorName") + " Ledger";