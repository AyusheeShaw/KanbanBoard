let flag = false;
let flagrem = false;
let flaglock = false;
let lockv = "fa-lock";
let unlockv = "fa-lock-open";
let ticketcolor = "black";
let tickeareatext = "";
const colorarray = ["lightpink", "lightgreen", "lightblue", "black"];
let localstoragearray = JSON.parse(localStorage.getItem("Tickets")) || [];

const plus = document.querySelector(".add-btn");
const remove = document.querySelector(".remove-btn");
const taskbox = document.querySelector(".modal-cont");
const lock = document.querySelector(".fa-solid fa-lock");
const maincont = document.querySelector(".main-cont");
const textArea = document.querySelector(".textArea-cont");
const colors = document.querySelectorAll(".priority-color");
const navbarcolors = document.querySelectorAll(".color");

//if in local storage ticket is present then creating in the browser
function init() {
    if (localStorage.getItem("Tickets")) {
        localstoragearray.forEach((ele) => {
            createElement(ele.ticketcolor, ele.TicketContent, ele.ticketid);
        });
    }
}

init();

function getindex(id) {
    const index = localstoragearray.findIndex((e) => {
        return e.ticketid == id;
    });
    return index;
}
// Searching tickets by colors
navbarcolors.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        const elec = ele.classList[0];
        console.log(elec);
        const alltickets = document.querySelectorAll(".ticket-cont");
        alltickets.forEach((tic) => {
            // console.log(tic);
            const ticcolele = tic.querySelector(".ticket-color");
            // console.log(ticcol);
            const ticcol = ticcolele.style.backgroundColor;
            // console.log(ticcol);
            if (ticcol == elec) {
                tic.style.display = "block";
            } else {
                tic.style.display = "none";
            }
        });
    });
});

navbarcolors.forEach((ele) => {
    ele.addEventListener("dblclick", (e) => {
        const alltickets = document.querySelectorAll(".ticket-cont");
        alltickets.forEach((tic) => {
            tic.style.display = "block";
        });
    });
});

plus.addEventListener("click", (e) => {
    if (flag) taskbox.style.display = "none";
    else taskbox.style.display = "flex";
    flag = !flag;
});
remove.addEventListener("click", (e) => {
    flagrem = !flagrem;
    if (flagrem) {
        alert("Delete Button is Activated");
        remove.style.color = "red";
    } else {
        remove.style.color = "white";
    }
});
function removeticket(ticket) {
    ticket.addEventListener("click", (e) => {
        if (flagrem) {
            ticket.remove();
            const index = getindex(
                ticket.querySelector(".ticket-id").innerText
            );
            localstoragearray.splice(index, 1);
            updatelocalstorage();
        }
    });
}

taskbox.addEventListener("keydown", (e) => {
    if (e.key == "Shift") {
        tickeareatext = textArea.value;
        // const ticketid = shortid();
        const ticketid = Math.random().toString(32).substring(2, 8);
        createElement(ticketcolor, tickeareatext, ticketid);
        taskbox.style.display = "none";
        textArea.value = "";
        flag = false;
        localstoragearray.push({
            ticketid,
            TicketContent: tickeareatext,
            ticketcolor,
        });
        updatelocalstorage();
    }
});
colors.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        colors.forEach((ele) => {
            ele.classList.remove("active");
        });

        ele.classList.add("active");
        ticketcolor = ele.classList[0];
    });
});

function createElement(ticketcol, tickettext, ticketid) {
    const newdiv = document.createElement("div");
    newdiv.setAttribute("class", "ticket-cont");
    newdiv.innerHTML = `
    <div class="ticket-color" style="background-color:${ticketcol}"></div>
    <div class="ticket-id">${ticketid}</div>
                <div class="task-area">${tickettext}</div>
                <div class="ticket-lock">
                    <i class="fa-solid fa-lock"></i>
                </div>
    `;
    removeticket(newdiv);
    lockfun(newdiv);
    changecolor(newdiv);
    maincont.appendChild(newdiv);
}
function lockfun(ticket) {
    const val = ticket.querySelector(".ticket-lock");
    const lockval = val.children[0];
    const textboxcontent = ticket.querySelector(".task-area");
    const index = getindex(ticket.querySelector(".ticket-id").innerText);
    // console.log("Val : ", val);
    // console.log("Val child : ", val.children[0]);
    lockval.addEventListener("click", (e) => {
        if (lockval.classList.contains(lockv)) {
            lockval.classList.remove(lockv);
            lockval.classList.add(unlockv);
            textboxcontent.setAttribute("contenteditable", "true");
        } else {
            lockval.classList.remove(unlockv);
            lockval.classList.add(lockv);
            textboxcontent.setAttribute("contenteditable", "false");
        }
        localstoragearray[index].TicketContent = textboxcontent.innerText;
        updatelocalstorage();
    });
}
function changecolor(ticket) {
    const colorele = ticket.querySelector(".ticket-color");
    colorele.addEventListener("click", (e) => {
        // console.log(color);
        const currentcolor = colorele.style.backgroundColor;
        // console.log(currentcolor);
        let colorindex = colorarray.findIndex((c) => {
            return currentcolor == c;
        });

        // console.log(colorindex);
        colorindex = colorindex + 1;
        colorindex = colorindex % colorarray.length;
        // console.log(colorindex);
        colorele.style.backgroundColor = colorarray[colorindex];
        const index = getindex(ticket.querySelector(".ticket-id").innerText);
        localstoragearray[index].ticketcolor = colorarray[colorindex];
        updatelocalstorage();
    });
}

// localStorage.setItem("ticket", "Ayushee");
function updatelocalstorage() {
    localStorage.setItem("Tickets", JSON.stringify(localstoragearray));
}
