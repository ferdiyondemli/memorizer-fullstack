var axios = require('axios');
 




   function getnewitem() {
  

    let data = [];
   axios.get("/getnewitem")
  .then(response => {
    
     data = response.data
    console.log("gelen : "+data["question"])

    document.querySelector("#question").innerHTML=data["question"]
    document.querySelector("#answer").innerHTML=data["answer"]
 
    })
  .catch(error => {
    console.log("olmadı :"+error)
  })
  unhideanswer();
}



function  deckupdate5min(){

  unhideanswer();
  console.log("gönderil "+document.querySelector("#question").innerHTML)

  axios.post('/deckupdate5min', {
    Word: document.querySelector("#question").innerHTML

  })
  .then( function (response) {

    document.querySelector("#question").innerHTML="yükleniyor..."
    data = response.data

 
    console.log(data)

    let chartStatus = Chart.getChart("pieChart");  
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    piech(parseInt(data["el"]))
    
      document.querySelector("#idholder").innerHTML=parseInt(data["el"])



      let chartStatusbar = Chart.getChart("barChart");  
      if (chartStatusbar != undefined) {
        chartStatusbar.destroy();
      }

      barch(parseInt(data["fivemin"]),parseInt(data["oneday"]),parseInt(data["threedays"]))
     
     
      document.querySelector("#idholder").innerHTML=parseInt(data["el"])
      document.querySelector("#fiveminholder").innerHTML=parseInt(data["fiveminholder"])
      document.querySelector("#onedayholder").innerHTML=parseInt(data["onedayholder"])
      document.querySelector("#threedays").innerHTML=parseInt(data["threedays"])
      document.querySelector("#remainingcards").innerHTML="Remaining cards: "+parseInt(data["realnow"])

      if(data["content"]==0){
        document.querySelector("#question").innerHTML=" <p> Please be back again you"+ data["fivemin"]+ " cards due in five minutes"
        document.querySelector("#answerer").classList.toggle("d-none")
        
      } else{
  
      
     document.querySelector("#question").innerHTML=data["question"]
    document.querySelector("#answer").innerHTML=data["answer"]
  
      }
  
  

 })
  .catch(function (error) {
    console.log("gödnerirke hata: "+error);
  });
   

 }

 function  deckupdate1day(){
  unhideanswer();
  console.log("gönderil "+document.querySelector("#question").innerHTML)

  axios.post('/deckupdate1day', {
    Word: document.querySelector("#question").innerHTML

  })
  .then( function (response) {

    document.querySelector("#question").innerHTML="yükleniyor..."
    data = response.data

 
    console.log(data)

    let chartStatus = Chart.getChart("pieChart");  
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    piech(parseInt(data["el"]))
    
      document.querySelector("#idholder").innerHTML=parseInt(data["el"])



      let chartStatusbar = Chart.getChart("barChart");  
      if (chartStatusbar != undefined) {
        chartStatusbar.destroy();
      }

      barch(parseInt(data["fivemin"]),parseInt(data["oneday"]),parseInt(data["threedays"]))
     
     
      document.querySelector("#idholder").innerHTML=parseInt(data["el"])
      document.querySelector("#fiveminholder").innerHTML=parseInt(data["fiveminholder"])
      document.querySelector("#onedayholder").innerHTML=parseInt(data["onedayholder"])
      document.querySelector("#threedays").innerHTML=parseInt(data["threedays"])
      document.querySelector("#remainingcards").innerHTML="Remaining cards: "+parseInt(data["realnow"])

      if(data["content"]==0){
        document.querySelector("#finalrender").innerHTML=" <p>Tewbrikler şimdi bitirdiniz 5dk sonra gelin</p><p>çinkü"+ data["fivemin"] + "adet kartınız sizi bekliyor olucak</p>"


      } else{
  
      
     document.querySelector("#question").innerHTML=data["question"]
    document.querySelector("#answer").innerHTML=data["answer"]
  
      }
  
  

 })
  .catch(function (error) {
    console.log("gödnerirke hata: "+error);
  });
   

 }

 function  deckupdate3days(){
  unhideanswer();
  console.log("gönderil "+document.querySelector("#question").innerHTML)

  axios.post('/deckupdate3days', {
    Word: document.querySelector("#question").innerHTML

  })
  .then( function (response) {

    document.querySelector("#question").innerHTML="yükleniyor..."
    data = response.data

 
    console.log(data)

    let chartStatus = Chart.getChart("pieChart");  
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    piech(parseInt(data["el"]))
    
      document.querySelector("#idholder").innerHTML=parseInt(data["el"])



      let chartStatusbar = Chart.getChart("barChart");  
      if (chartStatusbar != undefined) {
        chartStatusbar.destroy();
      }

      barch(parseInt(data["fivemin"]),parseInt(data["oneday"]),parseInt(data["threedays"]))
     
     
      document.querySelector("#idholder").innerHTML=parseInt(data["el"])
      document.querySelector("#fiveminholder").innerHTML=parseInt(data["fiveminholder"])
      document.querySelector("#onedayholder").innerHTML=parseInt(data["onedayholder"])
      document.querySelector("#threedays").innerHTML=parseInt(data["threedays"])
      document.querySelector("#remainingcards").innerHTML="Remaining cards: "+parseInt(data["realnow"])

      if(data["content"]==0){
        document.querySelector("#finalrender").innerHTML=" <p>Tewbrikler şimdi bitirdiniz 5dk sonra gelin</p><p>çinkü"+ data["fivemin"] + "adet kartınız sizi bekliyor olucak</p>"


      } else{
  
      
     document.querySelector("#question").innerHTML=data["question"]
    document.querySelector("#answer").innerHTML=data["answer"]
  
      }
  
  

 })
  .catch(function (error) {
    console.log("gödnerirke hata: "+error);
  });
   

 }

  



function unhideanswer(){
  document.querySelector("#answerdiv").classList.toggle("d-none");
  document.querySelector("#dater").classList.toggle("d-none");
  document.querySelector("#answerer").classList.toggle("d-none");
}

getnewitem();



     
