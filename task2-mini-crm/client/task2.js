const token = localStorage.getItem("token");

// 🔒 redirect if not logged in
if (!token) {
    window.location = "login.html";
}

// ADD LEAD
async function addLead() {
    await fetch("http://localhost:5000/api/leads/add", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            phone: phone.value,
            message: message.value
        })
    });

    loadLeads();
}

// LOAD LEADS
async function loadLeads() {
    const res = await fetch("http://localhost:5000/api/leads", {
        headers: {
            "Authorization": token
        }
    });

    const leads = await res.json();

    const div = document.getElementById("leads");
    div.innerHTML = "";

    leads.forEach(l => {
        div.innerHTML += `
            <div style="border:1px solid black; padding:10px; margin:10px;">
                <b>${l.name}</b> (${l.email})<br>
                Status: ${l.status}
                <button onclick="update('${l._id}')">Contacted</button>
            </div>
        `;
    });
}

// UPDATE STATUS
async function update(id) {
    await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "contacted" })
    });

    loadLeads();
}

loadLeads();