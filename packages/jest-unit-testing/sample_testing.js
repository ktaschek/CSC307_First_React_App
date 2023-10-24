function createPortfolio(){
    class Portfolio{
        constructor(){
            this.shares = {};
            this.tickerSymbols = [];
        }

        getTickerSymbols(){
            return this.tickerSymbols;
        }

        getShares(ticker){
            return this.shares[ticker] || 0;
        }

        isEmpty(){
            return Object.keys(this.shares).length === 0;
        }

        getTickerCount(){
            return this.tickerSymbols.length;
        }

        addShares(ticker, numShares) {
            this.tickerSymbols.push(ticker);
            this.shares[ticker] = numShares;
        }

        sellShares(ticker, numShares){
            if(this.shares[ticker] >= numShares){
                this.shares[ticker] -= numShares;
                if(this.shares[ticker] <= 0){
                    const idx = this.tickerSymbols.indexOf(ticker);
                    if (idx !== -1) {
                        this.tickerSymbols.splice(idx, 1);
                    }
                    delete this.shares[ticker];
                }
            }else{
                class ShareSaleExcpetion extends Error{
                    constructor(message){
                        super(message);
                        this.name = 'ShareSaleException';
                    }
                }
                throw new ShareSaleExcpetion("Tried to sell more shares than owned.");
            }
        }
    }
    let p = new Portfolio();
    return p;
}

export default {createPortfolio};