const apiKey = {
  key: 'c5b91d2b-39b3-4934-82c4-aee2d86cd130',
}

fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + apiKey.key)

  .then((response) => {
    if(!response.ok) throw new Error('Error status: ' + response.status);
    return response.json();
  })

  .then((api) => {
    
    var text = '';
    
    for (let i = 0; i < 10; i++){
      
      text = text + `
      <div class="media">
          <img src="coin.jpg" class="align-self-center mr-3" alt="coin" width="100" height="60">
          <div class="media-body">
            <h5 class="mt-2">${api.data[i].name}</h5>
            <p>${api.data[i].symbol}</p>
          </div>
      </div>
      `;

      document.getElementById("coins").innerHTML = text;
    }
  })

  .catch((error) => {
    console.error(error.message);
  });