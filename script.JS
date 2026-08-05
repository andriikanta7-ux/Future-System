const loader = document.querySelector("#loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1100);
});

const toast = document.querySelector(".toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}


const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach((item) => {
    observer.observe(item);
});


const countObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.target.dataset.done) {
                return;
            }

            entry.target.dataset.done = "true";

            const element = entry.target;
            const target = Number(element.dataset.target);
            const decimals = Number(element.dataset.decimals || 0);
            const suffix = element.dataset.suffix || "";
            const start = performance.now();

            function updateCounter(now) {
                const progress = Math.min((now - start) / 1400, 1);

                const value =
                    target * (1 - Math.pow(1 - progress, 3));

                element.textContent =
                    value.toLocaleString("en-US", {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals
                    }) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    },
    {
        threshold: 0.5
    }
);

document.querySelectorAll(".counter").forEach((item) => {
    countObserver.observe(item);
});


const themeButton = document.querySelector(".theme-toggle");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const currentTheme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("future-theme", currentTheme);
});

if (localStorage.getItem("future-theme") === "dark") {
    document.body.classList.add("dark");
}


document.querySelectorAll("[data-demo], .plan-button").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelector("#login").scrollIntoView({
            behavior: "smooth"
        });
    });
});


const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    showToast("Thanks — your message has been sent.");
    contactForm.reset();
});


const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;

    if (username === "admin" && password === "1234") {
        showToast("Welcome back, Admin. Opening dashboard…");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 650);
    } else {
        showToast("Use the demo account: admin / 1234");
    }
});


const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("open");

    menuButton.textContent = mobileNav.classList.contains("open")
        ? "✕"
        : "☰";
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuButton.textContent = "☰";
    });
});




const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("open");
            }
        });

        item.classList.toggle("open");
    });
});


const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 30){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

const cards = document.querySelectorAll(".feature-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 18;

        const rotateX = (rect.height / 2 - y) / 18;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});



const glow = document.querySelector(".cursor-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateGlow(){

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.left = currentX + "px";
    glow.style.top = currentY + "px";

    requestAnimationFrame(animateGlow);

}

animateGlow();


document.querySelectorAll("button, a").forEach((item)=>{

    item.addEventListener("mouseenter",()=>{

        glow.style.width="470px";
        glow.style.height="470px";
        glow.style.opacity=".95";

    });

    item.addEventListener("mouseleave",()=>{

        glow.style.width="340px";
        glow.style.height="340px";
        glow.style.opacity=".65";

    });

});



const activeUsers =
document.querySelector(".metric-grid article:nth-child(1) strong");

if(activeUsers){

    let users = 10284;

    setInterval(()=>{

        users += Math.floor(Math.random()*4);

        activeUsers.textContent =
        users.toLocaleString();

    },2500);

}


const storage =
document.querySelector(".metric-grid article:nth-child(2) strong");

if(storage){

    let value = 68.4;

    setInterval(()=>{

        value += (Math.random()-.5)*0.5;

        value=Math.max(65,Math.min(74,value));

        storage.innerHTML =
        value.toFixed(1)+"<span>%</span>";

    },2200);

}


const uptime =
document.querySelector(".metric-grid article:nth-child(3) strong");

if(uptime){

    let value=99.98;

    setInterval(()=>{

        value+= (Math.random()-.5)*0.01;

        value=Math.max(99.95,Math.min(99.99,value));

        uptime.innerHTML=
        value.toFixed(2)+"<span>%</span>";

    },3000);

}


const aiButton = document.getElementById("aiButton");
const aiWindow = document.getElementById("aiWindow");
const closeAI = document.getElementById("closeAI");

aiButton.addEventListener("click", () => {
    aiWindow.classList.toggle("open");
});

closeAI.addEventListener("click", () => {
    aiWindow.classList.remove("open");
});

const sendAI = document.getElementById("sendAI");
const aiInput = document.getElementById("aiInput");
const aiBody = document.querySelector(".ai-body");

function addMessage(text, fromUser = false) {
    const div = document.createElement("div");
    div.className = "ai-message";

    if (fromUser) {
        div.style.background = "#bcff45";
        div.style.marginLeft = "40px";
    }

    div.textContent = text;
    aiBody.appendChild(div);
    aiBody.scrollTop = aiBody.scrollHeight;
}

sendAI.addEventListener("click", () => {

    const question = aiInput.value.trim();

    if (!question) return;

    addMessage(question, true);

    aiInput.value = "";

    setTimeout(() => {

        let answer = "I'm still learning.";

        const q = question.toLowerCase();

        if (q.includes("security")) {
            answer = "Future System uses enterprise-grade encryption and secure access control.";
        } else if (q.includes("pricing")) {
            answer = "We offer Starter, Business and Enterprise plans.";
        } else if (q.includes("cloud")) {
            answer = "Our cloud infrastructure is designed for speed, scalability and reliability.";
        } else if (q.includes("support")) {
            answer = "Support is available 24/7 for all Business and Enterprise customers.";
        }

        addMessage(answer);

    }, 600);

});


const notificationBtn = document.getElementById("notificationBtn");
const notificationsPanel = document.getElementById("notificationsPanel");
const notificationCount = document.getElementById("notificationCount");
const clearNotifications = document.getElementById("clearNotifications");

notificationBtn.addEventListener("click", () => {
    notificationsPanel.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (
        !notificationsPanel.contains(event.target) &&
        !notificationBtn.contains(event.target)
    ) {
        notificationsPanel.classList.remove("open");
    }
});

clearNotifications.addEventListener("click", () => {
    notificationsPanel.innerHTML = `
        <div class="notifications-header">
            <h3>Notifications</h3>
        </div>
        <div class="notification-item">
            <p>No new notifications 🎉</p>
        </div>
    `;

    notificationCount.style.display = "none";
});

setInterval(() => {

    const messages = [
        "New user registered.",
        "Backup completed successfully.",
        "Server response time improved.",
        "Cloud synchronization completed.",
        "New security recommendation available."
    ];

    const item = document.createElement("div");

    item.className = "notification-item";

    item.innerHTML = `
        <strong>Future System</strong>
        <p>${messages[Math.floor(Math.random() * messages.length)]}</p>
    `;

    notificationsPanel.appendChild(item);

    const count = Number(notificationCount.textContent || 0) + 1;
    notificationCount.textContent = count;

}, 20000);


const timelineItems = document.querySelectorAll(".timeline-item");

const workflowObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.animate(

                [
                    {
                        opacity:0,
                        transform:"translateX(-40px)"
                    },
                    {
                        opacity:1,
                        transform:"translateX(0)"
                    }
                ],

                {
                    duration:700,
                    easing:"ease-out",
                    fill:"forwards"
                }

            );

            workflowObserver.unobserve(entry.target);

        }

    });

},{

    threshold:.3

});

timelineItems.forEach(item=>{

    item.style.opacity="0";

    workflowObserver.observe(item);

});