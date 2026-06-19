let loggedIn = false;
let selectedRoom = null;
let bookings = [];

const images = [
"https://images.unsplash.com/photo-1566665797739-1674de7a421a",
"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
"https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
];

// 20 rooms
let rooms = Array.from({length:20}, (_,i)=>({
    id:i+1,
    name:"Room "+(i+1),
    price:1000 + i*200,
    number:100+i,
    services:"WiFi, AC, TV",
    available:true,
    img: images[i%images.length]
}));

function showSection(id){
    document.querySelectorAll(".content").forEach(s=>s.style.display="none");
    document.getElementById(id).style.display="block";
}

// LOGIN
async function login(){
    let username = document.getElementById("user").value.trim();
    let password = document.getElementById("pass").value.trim();

    if(username === "" || password === ""){
        alert("Enter credentials");
        return;
    }

    let res = await fetch("/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    });

    let data = await res.json();

    if(data.success){
        loggedIn = true;
        alert("Login Successful ✅");
        showSection("rooms");
    } else {
        alert("Invalid Username or Password ❌");
    }
}

// DISPLAY ROOMS
function displayRooms(){
    let c = document.getElementById("roomList");
    c.innerHTML="";

    rooms.forEach(r=>{
        c.innerHTML += `
        <div class="card" onclick="bookRoom(${r.id})">
            <img src="${r.img}">
            <div style="padding:10px">
            <h3>${r.name}</h3>
            <p>Room No: ${r.number}</p>
            <p>₹${r.price}</p>
            <p>${r.services}</p>
            <p style="color:${r.available?'lightgreen':'red'}">
            ${r.available?'Available':'Booked'}
            </p>
            </div>
        </div>`;
    });
}

// BOOK FLOW
function bookRoom(id){
    if(!loggedIn){
        showSection("login");
        return;
    }

    let room = rooms.find(r => r.id === id);

    if(!room.available){
        alert("Already booked");
        return;
    }

    selectedRoom = room;

    document.getElementById("roomInfo").innerText =
        `${room.name} | Room ${room.number} | ₹${room.price}`;

    showSection("payment");
}

function completePayment(){
    let name = document.getElementById("cardName").value;
    let number = document.getElementById("cardNumber").value;
    let cvv = document.getElementById("cvv").value;

    if(name === "" || number === "" || cvv === ""){
        alert("Fill payment details");
        return;
    }

    selectedRoom.available = false;
    bookings.push(selectedRoom);

    alert("Payment Successful ✅ Room Booked");

    displayRooms();
    showSection("about");
    updateBookings();
}

// INIT
displayRooms();
showSection("home");