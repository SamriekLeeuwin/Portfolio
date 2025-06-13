async function fetchGitHubActivity() {
    const username = "SamriekLeeuwin";
    const res = await fetch(`https://api.github.com/users/${username}/events/public`);
    const data = await res.json();

    const container = document.getElementById("github-activity");
    container.innerHTML = "";

    data.slice(0, 5).forEach(event => {
        const { type, repo, created_at, payload } = event;
        const date = new Date(created_at).toLocaleString();

        let icon = "";
        let color = "";
        let message = "";

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
            const entry = document.createElement("div");
            entry.className = "log-entry";
            entry.innerHTML = `
        <div class="entry-left">
          <i class="${icon}" style="color:${color}; font-size:1.1rem;"></i>
          <span class="log-message">${message}</span>
        </div>
        <span class="badge">${date}</span>
      `;
            container.appendChild(entry);
        }
    });
}
fetchGitHubActivity();
