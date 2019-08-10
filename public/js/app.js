console.log('salom men qushildm')
fetch(`http://localhost:3000/weather?address=California`).then((res)=>{
   res.json().then(data=>{
       if (!data) {
           messageOne.textContent='Bunaqai yuq'
       }else{
          console.log(data.temperatura);
         
       }
   })
  
})  



