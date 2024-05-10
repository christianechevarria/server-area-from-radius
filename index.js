const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate-area', (req, res) => {
    const { radius } = req.body;
  
    console.log(radius);
    console.log(typeof radius);
  
    // Check if the radius is provided and handle empty or invalid inputs
    if (radius === "" || radius === null || radius === undefined || (typeof radius === "string" && radius.trim().length === 0)) {
      console.error('Server Error: Radius must be provided');
      return res.status(400).json({ error: 'Radius must be provided' });
    }
  
    const isString = typeof radius === "string";
    if (isString && !/^\d*\.?\d+$/.test(radius)) {
      console.error('Server Error: Invalid radius value', { radius });
      return res.status(400).json({ error: 'Radius must be numeric' });
    }
  
    // Convert the valid string to a number
    const radiusNum = isString ? parseFloat(radius) : radius;
  
    // Check if the conversion to number was successful and the value is within range
    if (isNaN(radiusNum) || radiusNum < 1 || radiusNum > 100) {
      console.error('Server Error: Radius out of range or non-numeric', { radius: radiusNum });
      return res.status(400).json({ error: 'Radius must be between 1 and 100' });
    }
  
    // Calculate the area of the circle using the radius
    const area = Math.PI * Math.pow(radiusNum, 2);
    return res.json({ success: true, area: area.toFixed(2) });
  });  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
