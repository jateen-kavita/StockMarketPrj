const url = "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata";
const StocksArr = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
]; // List of stock symbols you want to get data for

// Function to get data for a specific stock symbol
const stockInfo = async (symbol) => {
  const response = await fetch(url); // Request data from the API
  const jsonData = await response.json(); // Convert the response to JSON format
  const stocksStatsData = jsonData.stocksStatsData[0];
  return stocksStatsData[symbol]; // Get the data for the specified stock symbol
};

const asideSection = document.querySelector(".aside-section");
// Function to display stock data
const displayStockInfo = async () => {
  // Create an array of promises using map
  StocksArr.map(async (symbol) => {
    // Fetch data for the current stock symbol and log the result
    const data = await stockInfo(symbol);
    const bookValue = data.bookValue;
    const profit = data.profit;
    const stockValueContainer = document.createElement("div");
    stockValueContainer.classList.add("stockValueContainer");
    stockValueContainer.innerHTML = `
          <div class="stockValueWrapper">
            <div class="stockNames">
              <button  onclick="displayStockSummary('${symbol}','${bookValue}','${profit}')">${symbol}</button>
            </div>
            <div class="bookValue">
              <h4>${bookValue}</h4>
            </div>
            <div class="profit">
              <h4>${profit}</h4>
            </div>
          </div>
   `;
    asideSection.appendChild(stockValueContainer);
  });
};

displayStockInfo(); // Call the function to run the code

const stockSummaryURL =
  "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata";

const summarySection = document.querySelector(".summary-section");

const stockSummary = async (stock) => {
  const response = await fetch(stockSummaryURL);
  const data = await response.json();
  const insideData = data.stocksProfileData[0];
  return insideData[stock];
};

const displayStockSummary = async (stocksummary,bookValue,profit) => {
  summarySection.innerHTML = ""; // Clears previous content before showing the selected stock's summary

  const stocksSummary = await stockSummary(stocksummary);
  const summaryText = stocksSummary.summary;

  const summaryContainer = document.createElement("div");
  summaryContainer.innerHTML = `
      <div class="summaryWrapper">
            <div class="summaryStockName">
                <h4>${stocksummary}</h4>
                <h4>${bookValue}</h4>
                <h4>${profit}</h4>
            </div>
            <div class="summary">
              <p>${summaryText}</p>
            </div>
      </div>`;

  summarySection.appendChild(summaryContainer);
};


//displayStockSummary();

const stockMarketURL =
  "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata";

const stockMarket = async (stocks) => {
  const response = await fetch(stockMarketURL);
  const data = await response.json();
  const stocksData = data.stocksData[0];
  return stocksData[stocks];
};

const displayStockMarket = async () => {
  StocksArr.map(async (stock) => {
    const stockValue = await stockMarket(stock);
    const fiveYr = stockValue["5y"];
    const oneYr = stockValue["1y"];
    const threeMonth = stockValue["3mo"];
    const oneMonth = stockValue["1mo"];

    const fiveYrTimeStamp = fiveYr.timeStamp;
    const oneYrTimeStamp = oneYr.timeStamp;
    const threeMonthTimeStamp = threeMonth.timeStamp;
    const oneMonthTimeStamp = oneMonth.timeStamp;

    const fiveYrValue = fiveYr.value;
    const oneYrValue = oneYr.value;
    const threeMonthValue = threeMonth.value;
    const oneMonthValue = oneMonth.value;
  });
};
//displayStockMarket();



