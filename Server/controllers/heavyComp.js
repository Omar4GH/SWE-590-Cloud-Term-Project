
// Function to perform prime factorization
const primeFactorization = (number) => {
  if (number < 2) {
    return [];
  }

  const factors = [];
  let divisor = 2;

  while (number >= 2) {
    if (number % divisor === 0) {
      factors.push(divisor);
      number /= divisor;
    } else {
      divisor++;
    }
  }

  return factors;
};

// Endpoint for heavy computation (prime factorization)
export const getHeavyComputation = async (req, res) => {
  const { number } = req.body;

  try {
    const factors = primeFactorization(number);
    console.log("Done Calculating")
    res.status(200).json({ factors });
  } catch (error) {
    console.error('Error performing heavy computation:', error);
    res.status(500).json({ error: 'Error performing heavy computation' });
  }
};



