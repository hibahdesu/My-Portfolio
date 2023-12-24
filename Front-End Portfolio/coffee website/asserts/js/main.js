//Show Menu when clicking on it
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        })
    }
}
showMenu('nav-toggle', 'nav-menu');

//Remove Menu mobile
const navLinks = document.querySelectorAll('.nav__link');
function actionLink() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(li => li.addEventListener('click', actionLink));

//Scroll section active link
const navSections = document.querySelectorAll('section[id]');
function activeScrolling() {
    const scrollY = window.pageYOffset;
    navSections.forEach(curr => {
        const secHeight = curr.offsetHeight;
        const secTop = curr.offsetTop;
        const secId = curr.getAttribute('id');

        if (scrollY > secTop && scrollY <= secTop + secHeight) {
            document.querySelector('.nav__menu a[href*=' + secId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + secId + ']').classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', activeScrolling);


//Change Background header


function scrollHeader() {
    const headerNav = document.getElementById('header');
    if (this.scrollY >= 200) {
        headerNav.classList.add('scroll-header');
    } else {
        headerNav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


//Show scroll top
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 560) {
        scrollTop.classList.add('scroll-top');
    } else {
        scrollTop.classList.remove('scroll-top');
    }
}
window.addEventListener('scroll', scrollTop);






