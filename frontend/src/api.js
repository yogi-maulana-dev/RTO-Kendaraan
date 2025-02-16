import axios from "axios";

const API_URL = "http://localhost/electron-app/backend/api";

export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/getData.php`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const insertData = async (name, email) => {
  try {
    const response = await axios.post(`${API_URL}/insertData.php`, {
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting data:", error);
    return { error: error.message };
  }
};
