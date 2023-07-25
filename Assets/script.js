// const url = 'https://sofasport.p.rapidapi.com/v1/sports/number-live';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '7f9972221bmsh761004b493b6a3ep1f6857jsne1326cb75163',
// 		'X-RapidAPI-Host': 'sofasport.p.rapidapi.com'
// 	}
// };

// try {
// 	 fetch(url, options).then(function(response){
//         return response.json()
//      })
// 	 .then(function(data){
//         console.log (data);
//      });
// } catch (error) {
// 	console.error(error);
// }


fetch("https://api.the-odds-api.com/v4/sports/?apiKey=d272dd2fc8c59ce6fb029378e95778ad").then
(function(response){
    return response.json()
})
    .then(function(data){
        console.log(data)
    }) 

    