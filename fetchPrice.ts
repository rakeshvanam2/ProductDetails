import axios from 'axios';
import cheerio from 'cheerio';

// Function to fetch product details from Amazon
async function fetchFromAmazon(keyword: string): Promise<void> {
  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    const firstResult = $('div[data-asin]').first();

    const productDetails = {
      name: firstResult.find('span.a-size-base-plus').text().trim(),
      price: firstResult.find('span.a-offscreen').text().trim(),
      seller: firstResult.find('div span[data-store]').text().trim()
    };

    console.log('Product Details from Amazon:');
    console.log(productDetails);
  } catch (error: unknown) {
    console.error('Error fetching data from Amazon:', (error as Error).message);
  }
}

// Function to fetch product details from Flipkart
async function fetchFromFlipkart(keyword: string): Promise<void> {
  try {
    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    const firstResult = $('div[data-id]').first();

    const productDetails = {
      name: firstResult.find('a[rel=nofollow]').text().trim(),
      price: firstResult.find('div._30jeq3._1_WHN1').text().trim(),
      seller: firstResult.find('div._2kHMtA').text().trim()
    };

    console.log('Product Details from Flipkart:');
    console.log(productDetails);
  } catch (error: unknown) {
    console.error('Error fetching data from Flipkart:', (error as Error).message);
  }
}

// Main function to fetch price from both Amazon and Flipkart
async function fetchPrice(keyword: string): Promise<void> {
  console.log(`Fetching price for "${keyword}"...\n`);

  await fetchFromAmazon(keyword);
  console.log('\n');

  await fetchFromFlipkart(keyword);
}

// Usage example: Fetching price for "macbook air m1"
fetchPrice('macbook air m1');