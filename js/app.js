const body = document.querySelector('body');
const menuToggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');

menuToggle.addEventListener('click',()=>{
    body.classList.toggle('open')
    menuToggle.classList.toggle('open')
    menu.classList.toggle('open')
})

// bookmark
const  bookBtn = document.querySelector('.bookmark');

bookBtn.addEventListener('click',()=>{
    const span = bookBtn.querySelector('span');
    if (bookBtn.classList.contains('clicked')) {
       bookBtn.classList.remove('clicked'); 
       span.textContent='Bookmark'
    }else{
        bookBtn.classList.add('clicked'); 
        span.textContent='Bookmarked'
    }
})

// out of stock
const itemLeft = document.querySelectorAll('.pledge__left span');

function outofStockBtn(item){
    item.parentElement.nextElementSibling.textContent='Out of Stock'

}

itemLeft.forEach(item=>{
    if (item.textContent=='0') {
        item.parentElement.parentElement.parentElement.classList.add('outOfStock');
        outofStockBtn(item);
    }
})

// modal open close
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__content>svg');
const ModalBtns = document.querySelectorAll('.btnModal');

ModalBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        modal.style.display='block';
    })
})
modalClose.addEventListener('click', ()=>{
    modal.style.display='none';
})

// selecting radio

const radioBtns = document.querySelectorAll('input[name="check"]');

radioBtns.forEach((radioBtn)=>{
    radioBtn.addEventListener('click', ()=>{
       backToGray(radioBtn);
        if (radioBtn.checked) {
            const currentPledge=radioBtn.parentElement;
            currentPledge.style.borderColor = ' hsl(176, 50%, 47%)'
            showPledge(currentPledge);
        }
    })
})


function backToGray(currentBtn){
    radioBtns.forEach(btn=>{
        const pledge = btn.parentElement;
        const selected = pledge.querySelector('.pledge__selected');
        const left = pledge.querySelector('.pledge__left');
        left.style.display = 'block';
        selected.style.display = 'none';
        if(btn!=currentBtn)
        {
            btn.parentElement.style.borderColor ='rgb(233, 232, 232)';
        }
    })
}
function showPledge(pledge){
    const selected = pledge.querySelector('.pledge__selected');
    const left = pledge.querySelector('.pledge__left');
    left.style.display='none';
    selected.style.display='grid';
}

const Showbtns = document.querySelectorAll('.btn_show');

Showbtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        const pledge = btn.parentElement.parentElement;
        showPledge(pledge);
        const currentRadio = pledge.querySelector('input[name="check"]');
        currentRadio.checked=true;
        pledge.style.borderColor = ' hsl(176, 50%, 47%)'
        

    })
})

const contBtns = document.querySelectorAll('.btn_success');
const tyModal = document.querySelector('.ty_modal');
contBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        if(checkMoney(btn)){

            modal.style.display ='none';
            tyModal.style.display='block';
            radioBtns.forEach((btn)=>{
                btn.checked = false;
                const pledge = btn.parentElement;
                pledge.style.borderColor='rgba(232,232,232)';
                const selected = pledge.querySelector('.pledge__selected');
                const left = pledge.querySelector('.pledge__left');
                left.style.display = 'block';
                selected.style.display = 'none';
                
            })
            const entries = document.querySelectorAll('input[type=text]');
            entries.forEach(entry=>{
                entry.value='';
            })
        }
    })
})

const gotBtn= document.querySelector('.ty_modal_content .btn');
gotBtn.addEventListener('click', ()=>{
    tyModal.style.display = 'none';

})

// check inputs
 function checkMoney(btn){
     const money = btn.previousElementSibling.value;
    if(money){
        updateStat(money);
        return true;
    }
}

// update

function updateStat(money){
const stats = document.querySelectorAll('.stats__stat h2');
stats[0].id = parseInt(stats[0].id) + parseInt(money);
stats[0].textContent = `$${stats[0].id.slice(0,2)},${stats[0].id.slice(2)}`;
stats[1].textContent = parseInt( stats[1].textContent)+1;
const range = document.querySelector('.stats__range span');
range.style.width = `${parseInt(stats[0].id)/1000}%`;


}

