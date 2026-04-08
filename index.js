import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js"      

const firebaseConfig = {
    
    apiKey: "AIzaSyCFdOlyGUlePWpaFx-U-LZX2SfC-TRet5g",
    authDomain: "natural-archives-leads-tracker.firebaseapp.com",
    databaseURL: "https://natural-archives-leads-tracker-default-rtdb.firebaseio.com",
    projectId: "natural-archives-leads-tracker",
    storageBucket: "natural-archives-leads-tracker.firebasestorage.app",
    messagingSenderId: "461625303152",
    appId: "1:461625303152:web:94490820aac681dd60d4b5"
   
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")



function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
})

deleteBtn.addEventListener("dblclick", function() {
    
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})