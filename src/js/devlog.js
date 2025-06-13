import { manualDevlog } from "./manual-devlog.js";

function renderManualDevlog(container) {
    manualDevlog.forEach(entry => {
        const div = document.createElement("div");
        div.className = "timeline-entry manual";
        div.innerHTML = `
      <h4><i class="fa-solid fa-pen-to-square" style="color:#10b981; margin-right:6px;"></i>${entry.title}</h4>
      <p>${entry.content}</p>
      <div class="timestamp">${entry.date}</div>
    `;
        container.appendChild(div);
    });
}

async function fetchGitHubActivity() {
    const username = "SamriekLeeuwin";
    const res = await fetch(`https://api.github.com/users/${username}/events/public`);
    const data = await res.json();

    const container = document.getElementById("github-activity");
    container.innerHTML = "";

    data.slice(0, 5).forEach(event => {
        const { type, repo, created_at, payload } = event;
        const date = new Date(created_at).toLocaleString();

        let icon = "", color = "", message = "";

        if (type === "PushEvent") {
            icon = "fa-solid fa-code";
            color = "#3b82f6";
            message = `Commit to <strong>${repo.name}</strong>`;
        } else if (type === "PullRequestEvent") {
            icon = "fa-solid fa-code-pull-request";
            color = "#8b5cf6";
            message = `PR on <strong>${repo.name}</strong>`;
        } else if (type === "IssuesEvent") {
            icon = "fa-solid fa-circle-exclamation";
            color = "#f59e0b";
            message = `Issue ${payload.action} on <strong>${repo.name}</strong>`;
        }

        if (message) {
            const div = document.createElement("div");
            div.className = "timeline-entry github";
            div.innerHTML = `
        <h4><i class="${icon}" style="color:${color}; margin-right:6px;"></i>${message}</h4>
        <div class="timestamp">${date}</div>
      `;
            container.appendChild(div);
        }
    });

    renderManualDevlog(container);
}

fetchGitHubActivity();
