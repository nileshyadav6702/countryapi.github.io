const countryies=document.querySelector('.country')
const search=document.querySelector('.input')
const filter=document.querySelector('.fill')
const options=document.querySelector('.options')

call('https://restcountries.com/v3.1/all')
function call(url){
    fetch(url).then((res)=>{
        return  res.json()
    }).then((data)=>{
        
        for ( let i=0;i<data.length;i++){
            const country=data[i]
            const cnt=document.createElement('a')
            cnt.classList.add('card')
            cnt.href=`/country.html?name=${country.name.common}`
            cnt.innerHTML=`<img src="${country.flags.svg}" alt="">
            <div class="content">
            <h2 class="name">${country.name.common}</h2>
            <p>population:<span id="poputation">${formator(country.population)}</span></p>                
            <p>Region: <span id="region">${country.region}</span></p>             
            <p>Capital:<span id="capital">${country.capital}</span></p>     
            </div>`
            countryies.append(cnt)
            
        }
    })

}




function formator(num){
    var formattor=new Intl.NumberFormat('en-IN')
    var formatedNumber=formattor.format(num)
    return formatedNumber
}


search.addEventListener('input',(e)=>{
    if (!e.target.value){
        call('https://restcountries.com/v3.1/all')
        
    }
    countryies.innerHTML=''
    call(`https://restcountries.com/v3.1/name/${e.target.value}`)
})


filter.addEventListener('click',(e)=>{  
    options.classList.toggle('show')
    
    options.addEventListener('click',(e)=>{
        filter.innerHTML =`${e.target.innerText} <i class="fa-solid fa-angle-down angle" ></i> `
        options.classList.remove('show')
        
        console.log(e.target.innerText);
        countryies.innerHTML=''
        call(`https://restcountries.com/v3.1/region/${e.target.innerText}`)
    })
    
})


const darkMode=document.querySelector('.mode')
const header=document.querySelector('.top-part')
const sch=document.querySelector('.search')
const fil=document.querySelector('.filter')
darkMode.addEventListener('click',(e)=>{
    [...document.querySelectorAll('.card')].forEach((an)=>{
        an.classList.toggle('card-dark')
    })
    header.classList.toggle('card-dark')
    sch.classList.toggle('card-dark')
    search.classList.toggle('card-dark')
    fil.classList.toggle('card-dark') 
    options.classList.toggle('card-dark')
    document.body.classList.toggle('body-dark')
    
})