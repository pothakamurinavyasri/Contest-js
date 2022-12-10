

async function getData() {
    let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    let result = await fetch(url);
    let data = result.json()
    return data
}
let tableData = ""
getData()
    .then(res => {
        console.log(res)
        res.map(data => {
            let num1=new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.current_price);
            let num2=new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_cap_change_24h);
            let num3=new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_cap);
            
            tableData += `
            
            <tr>
                <td style="display:flex;align-items:center"><img src="${data.image}" height="30px" width="30px"><span style="margin-left:1rem;">${data.name}</span></td>
                <td>${data.symbol.toUpperCase()}</td>
                <td>${num1}</td>
                <td>${num2}</td>
                <td style="${data.market_cap_change_percentage_24h>0?"color:green":"color:red"}">${data.market_cap_change_percentage_24h.toFixed(2)}%</td>
                <td>Mkt Cap : ${num3}</td>
                </tr>
            
            `
        })
        document.getElementById("tBody").innerHTML = tableData;
    })