async function fetchGitHubActivity() {
    const username = "SamriekLeeuwin"; //
    const res = await fetch(`https://api.github.com/users/${username}/events/public`);
    const data = await res.json();

    const list = document.getElementById("github-activity");
    list.innerHTML = "";

    data.slice(0, 5).forEach(event => {
        let item = document.createElement("li");
        let type = event.type;
        let repo = event.repo.name;
        let date = new Date(event.created_at).toLocaleString();

        if (type === "PushEvent") {
            item.textContent = `Pushed to ${repo} at ${date}`;
        } else if (type === "PullRequestEvent") {
            item.textContent = `Pull request on ${repo} at ${date}`;
        } else if (type === "IssuesEvent") {
            item.textContent = `Issue ${event.payload.action} on ${repo} at ${date}`;
        } else {
            return;
        }

        list.appendChild(item);
    });
}

fetchGitHubActivity();