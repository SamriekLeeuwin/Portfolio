document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".toggle-btn");
    const sections = document.querySelectorAll(".project-section");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;

            // Toggle buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Toggle sections
            sections.forEach(section => {
                section.classList.toggle("active", section.id === targetId);
            });
        });
    });
});
