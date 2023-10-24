import mut from "./sample_testing.js";

test('Test stock portfolio creation', () => {
    let portfolio = mut.createPortfolio();
    expect(portfolio.getTickerSymbols()).toEqual([]);
    expect(portfolio.getShares('AAPL')).toBe(0);
});

test('test if portfolio is empty', () => {
    let portfolio = mut.createPortfolio();
    expect(portfolio.isEmpty()).toBeTruthy();
});

test('test count of ticker symbols', () => {
    let portfolio = mut.createPortfolio();
    expect(portfolio.getTickerCount()).toBe(0);
});

test('test adding shares', () => {
    let portfolio = mut.createPortfolio();
    portfolio.addShares("GME", 5);
    expect(portfolio.getShares("GME")).toBe(5);
});

test('test sell shares', () => {
    let portfolio = mut.createPortfolio();
    portfolio.addShares("GME",10)
    portfolio.sellShares("GME", 5);
    expect(portfolio.getShares("GME")).toBe(5);
});

test('test shares do not appear if there are zero', () =>{
    let portfolio = mut.createPortfolio();
    portfolio.addShares("XYZ", 10);
    portfolio.sellShares("XYZ", 10);
    expect(portfolio.getShares("XYZ")).toBe(0);
    expect(portfolio.getTickerSymbols().includes("XYZ")).toBeFalsy();
});

test('test no overselling', () =>{
    let portfolio = mut.createPortfolio();
    portfolio.addShares("XYZ", 5);
    try{
        portfolio.sellShares('XYZ', 5);
    }catch (error){
        expect(error).toBe(ShareSaleException);
    }
});
