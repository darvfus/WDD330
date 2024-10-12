// Function to convert response to JSON and handle errors
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`; // Set path to JSON file based on category
  }

  // Method to fetch data from JSON file
  getData() {
    return fetch(this.path)
      .then(convertToJson) // Convert response to JSON
      .then((data) => data); // Return the data
  }

  // Method to find a product by its ID
  async findProductById(id) {
    const products = await this.getData(); // Wait for the data to be fetched
    return products.find((item) => item.id === id); // Use lowercase 'id' for matching
  }
}
