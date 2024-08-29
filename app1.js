const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");
/* -------------------------------------------------------------------------- */
/*                        LOADİNG TOPLARININ KAYBOLMASI                       */
/* -------------------------------------------------------------------------- */
const timeout1 = setTimeout(() => {
      loadingDiv.remove();
    }, 3000)
/* -------------------------------------------------------------------------- */
/*                         KEDİLERİN PİYASAYA ÇIKMASI                         */
/* -------------------------------------------------------------------------- */
const timeout2=setTimeout(() =>{    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    .then((res) => {
          if (!res.ok) {
          throw new Error('Something went wrong while fetching...')
        }
        return res.json()
      })
      .then((data) => {
    data.forEach(({url}) => {
    cardDiv.innerHTML+=`<div class="col-12 col-sm-6 col-lg-4">
      <div style="height:200px;">
        <img src="${url}" class="w-100 h-100" alt="...">
      </div>
</div>`;
})
/* -------------------------------------------------------------------------- */
/*                          HATA GİFİNİ DOMA AKTARMA                          */
/* -------------------------------------------------------------------------- */
      })
      .catch((err) => {
        displayError(err)
      })
      tarih.innerText=new Date().toLocaleDateString('en-CA');
    },3000)
displayError=(err)=>{
cardDiv.innerHTML=`<img src='./img/error.gif'alt=''/>`
}
/* -------------------------------------------------------------------------- */
/*                      YENİ RESİMLER İÇİN BUTONA TIKLAMA                     */
/* -------------------------------------------------------------------------- */
btn.addEventListener('click',()=>{
    cardDiv.innerHTML=`<div id="loading" class="text-center" style="height: 110vh">
      <img src="./img/loading.gif" />
    </div>`;  
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
.then((res)=>{
    if(!res.ok){
        throw new Error('something went wrong')
    }
    return res.json()
})
.then((data)=>{
cardDiv.innerHTML='';
    data.forEach(({url}) => {
        cardDiv.innerHTML+=`
      <div class="col-12 col-sm-6 col-lg-4">
          <div style="height:200px;">
            <img src="${url}" class="w-100 h-100" alt="...">
          </div>
    </div>`;
})
})
.catch((err)=>{
    displayError(err)
})
})

