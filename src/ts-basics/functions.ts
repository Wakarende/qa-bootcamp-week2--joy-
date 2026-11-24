function calculateTax(income: number, taxYear = 2022) : number {
   if( taxYear < 50000)
    return income * 1.2;
   return income * 1.3;
}

calculateTax(10000);

//Always properly annotate your functions and return types