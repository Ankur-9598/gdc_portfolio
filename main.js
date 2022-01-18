const homeBtn = document.getElementById('home');
const projectsBtn = document.getElementById('projects');


projectsBtn.onclick = () => {
    homeBtn.classList.remove('active');
    projectsBtn.classList.add('active');
}

homeBtn.onclick = () => {
    homeBtn.classList.add('active');
    projectsBtn.classList.remove('active');
}