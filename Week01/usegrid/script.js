const main = document.querySelector('main')
const link = document.querySelector('link[theme]')

const tabButton = [...document.querySelectorAll('*[role=tab-button]')]
const tabContent = [...document.querySelectorAll('*[role=tab-content]')]

tabContent.forEach(tab=>{
    tab.style.display = 'none'
})

tabContent[0].style.display = 'block';
tabButton[0].classList.add('active');

tabButton.forEach(button=>{
    button.addEventListener('click',function(){
        tabButton.forEach(b=>{
            b.classList.remove('active')
        })
        let theme = button.getAttribute('vision')
        changeTheme(theme)
        button.classList.add('active')
        tabContent.forEach(tab=>{
            tab.style.display = 'none'
        })
        const tab = button.getAttribute('aria-controls')
        document.querySelector(tab).style.display = 'block'
    }
    )
})

async function changeTheme(target){
    const response = await fetch('theme/' + target + '.css')
    const theme = await response.text()
    if (response.ok){
        link.href = 'theme/' + target + '.css'
    }else{
        link.href = ''
    }
}