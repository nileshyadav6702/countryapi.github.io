const countryName=new URLSearchParams(location.search
).get('name')
var nam=document.querySelector('#country-name')
const img=document.querySelector('.flag img')
const native_name=document.querySelector('#nat-name')
const population=document.querySelector('#pop')
const region=document.querySelector('#reg')
const sub_region=document.querySelector('#sbreg')
const capital=document.querySelector('#cap')
const domain=document.querySelector('#dom')
const currency=document.querySelector('#cur')
const language=document.querySelector('#lan')
const tam=document.querySelector('.bor')
const back=document.querySelector('.back')
getcountry(countryName)


// back.onclick=window.history.go(-1)
function getcountry(country){
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`).then(res => res.json())
    .then((data)=>{
    
        const da=data[0]
        // console.log(da.borders);
        img.src=da.flags.svg;
        nam.innerText=da.name.common
        if (countryName !=='Antarctica'){
            native_name.innerText=Object.values(da.name.nativeName)[0].common
            currency.innerText=Object.values(da.currencies)[0].name
            language.innerText=Object.values(da.languages)
        }
        else{
            native_name.innerText='Antarctica'
            currency.innerText='No Currency'
            language.innerText='No language'
        }
        population.innerText=formator(da.population)
        region.innerText=da.region
        sub_region.innerText=da.subregion
        capital.innerText=da.capital
        domain.innerText=da.tld
    
        if (da.borders){
            da.borders.forEach((cd)=>{
                fetch(`https://restcountries.com/v3.1/alpha/${cd}`)
                .then( res => res.json())
                .then((data)=> {
                    const nab=document.createElement('p')
                    nab.className='border'
                    const anch=document.createElement('a')
                    anch.innerText=data[0].name.common
                    anch.href=`/country.html?name=${data[0].name.common}`
                    nab.appendChild(anch) 
                    tam.append(nab)
                })
            })
            
    
        }
        else{
            console.log('no border');
            
        }
        
        
    })

}

function formator(num){
    var formattor=new Intl.NumberFormat('en-IN')
    var formatedNumber=formattor.format(num)
    return formatedNumber
}

const darkMode=document.querySelector('.mode')
const header=document.querySelector('.top-part')
const cnt=document.querySelector('.country-text')
darkMode.addEventListener('click',(e)=>{
    [...document.querySelectorAll('.border')].forEach((btn)=>{
        btn.classList.toggle('card-dark')
    })
    back.classList.toggle('card-dark')
    cnt.classList.toggle('card-dark')
    document.body.classList.toggle('body-dark')
    header.classList.toggle('card-dark')
    
})

