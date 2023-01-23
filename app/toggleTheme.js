const body = document.querySelector('body');
const header = document.querySelector('header');
const main = document.querySelector('main');
const button = document.querySelector('.toggle-btn');
const aButton = document.querySelector('a');
const inputSpace = document.querySelector('.custom-input');


const toggleColor = (el, color) => el.setAttribute('class', color);

button.addEventListener('click', () => {
    const cardsBody = document.querySelectorAll('.card-area');
    const lightDarkmode = document.querySelector('.toggle-btn');
    if(lightDarkmode.classList.value.includes('light')){
        lightDarkmode.classList.remove('light');
        toggleColor(header, 'bg-secondary container-md');
        toggleColor(body,'bg-dark');
        toggleColor(main,'bg-dark');
        if(inputSpace){
            toggleColor(inputSpace, 'custom-input bg-dark text-light form-control');
            inputSpace.focus();
        };
        if(aButton){
            toggleColor(aButton, 'btn text-light');
        }
        cardsBody.forEach(card => toggleColor(card, 'card-body card-area bg-dark text-light'));
        lightDarkmode.innerHTML = `Light Mode 
        <span class="material-symbols-outlined position-absolute top-50 start-0 translate-middle toggle-icon">
        brightness_6
        </span>`;
        return;
    }else{
        lightDarkmode.classList.add('light');
        toggleColor(header, 'bg-white container-md');
        toggleColor(body,'bg-light');
        toggleColor(main,'bg-light');
        if(inputSpace){
            toggleColor(inputSpace, 'custom-input form-control');
        };
        if(aButton){
            toggleColor(aButton, 'btn');
        }     
        cardsBody.forEach(card => toggleColor(card, 'card-body card-area'));
        lightDarkmode.innerHTML = `Dark Mode 
        <span class="material-symbols-outlined position-absolute top-50 start-0 translate-middle toggle-icon">
        brightness_4
        </span>`;
        return;
    }
})