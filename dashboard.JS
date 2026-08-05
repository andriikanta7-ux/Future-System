const toast = document.querySelector(".dash-toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


document.querySelector("#logout").addEventListener("click", () => {
    showToast("Signed out. Returning to homepage…");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});


const inviteButton = document.querySelector(".invite");
const inviteModal = document.querySelector("#invite-modal");
const closeInvite = document.querySelector(".close-invite");
const sendInvite = document.querySelector(".send-invite");
const memberName = document.querySelector("#member-name");
const memberEmail = document.querySelector("#member-email");

inviteButton.addEventListener("click", () => {
    inviteModal.classList.add("open");
});

closeInvite.addEventListener("click", () => {
    inviteModal.classList.remove("open");
});

inviteModal.addEventListener("click", (event) => {
    if (event.target === inviteModal) {
        inviteModal.classList.remove("open");
    }
});

const teamList = document.querySelector(".team-list");

sendInvite.addEventListener("click", () => {
    const name = memberName.value.trim();
    const email = memberEmail.value.trim();

    if (name === "" || email === "") {
        showToast("Enter a name and email address.");
        return;
    }

    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const newMember = document.createElement("li");

    newMember.innerHTML = `
        <b class="avatar a2">${initials}</b>

        <span>
            ${name}
            <small>Invited team member</small>
        </span>

        <em>Just now</em>
    `;

    teamList.appendChild(newMember);

    inviteModal.classList.remove("open");

    memberName.value = "";
    memberEmail.value = "";

    showToast(`Invitation sent to ${name}.`);
});


const bellButton = document.querySelector(".bell");
const notificationMenu = document.querySelector(".notification-menu");
const markRead = document.querySelector(".mark-read");

bellButton.addEventListener("click", () => {
    notificationMenu.classList.toggle("open");
});

markRead.addEventListener("click", () => {
    notificationMenu.classList.remove("open");

    document.querySelector(".notification-title span").textContent =
        "All read";

    document.querySelector(".bell i").style.display = "none";

    showToast("All notifications marked as read.");
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".notification-area")) {
        notificationMenu.classList.remove("open");
    }
});


const searchInput = document.querySelector("#search");
const searchResults = document.querySelector("#search-results");
const searchButtons = document.querySelectorAll(".search-results button");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    searchResults.classList.toggle("open", value.length > 0);

    searchButtons.forEach((button) => {
        const text = button.textContent.toLowerCase();

        button.classList.toggle(
            "hidden",
            !text.includes(value)
        );
    });
});

searchButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.dataset.target;

        if (target === "settings") {
            settingsButton.click();
        } else {
            document.querySelector(`#${target}`).scrollIntoView({
                behavior: "smooth"
            });
        }

        searchInput.value = "";
        searchResults.classList.remove("open");
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-area")) {
        searchResults.classList.remove("open");
    }
});


document.querySelector(".filter").addEventListener("click", () => {
    showToast("Showing all recent activity.");
});

const profileButton = document.querySelector(".profile");
const profileMenu = document.querySelector(".profile-menu");

profileButton.addEventListener("click", () => {
    profileMenu.classList.toggle("open");
});

const settingsButton = document.querySelector("#settings-button");
const settingsModal = document.querySelector("#settings-modal");
const closeSettings = document.querySelector(".close-settings");
const saveSettings = document.querySelector(".save-settings");
const displayName = document.querySelector("#display-name");

settingsButton.addEventListener("click", () => {
    settingsModal.classList.add("open");
    profileMenu.classList.remove("open");
});

closeSettings.addEventListener("click", () => {
    settingsModal.classList.remove("open");
});

settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
        settingsModal.classList.remove("open");
    }
});

function updateUserName(name) {
    document.querySelector(".profile span").innerHTML =
        `${name}<br><small>Administrator</small>`;

    document.querySelector(".dash-header h1").textContent =
        `Good morning, ${name}.`;

    displayName.value = name;
}

const savedUserName = localStorage.getItem("future-user-name");

if (savedUserName) {
    updateUserName(savedUserName);
}

saveSettings.addEventListener("click", () => {
    const name = displayName.value.trim();

    if (name === "") {
        showToast("Enter your display name.");
        return;
    }

    localStorage.setItem("future-user-name", name);

    updateUserName(name);

    settingsModal.classList.remove("open");
    showToast("Settings saved successfully.");
});

document.querySelector(".profile-logout").addEventListener("click", () => {
    showToast("Signed out. Returning to homepage…");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile-area")) {
        profileMenu.classList.remove("open");
    }
});

const sidebarLinks = document.querySelectorAll(".sidebar nav a");

sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = link.getAttribute("href");

        if (target === "#settings") {
            event.preventDefault();

            settingsModal.classList.add("open");
            profileMenu.classList.remove("open");
        }

        sidebarLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});