const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function calculateArea(radius) {
  // Validate and calculate the area
  const isString = typeof radius === "string";
  if (isString && !/^\d*\.?\d+$/.test(radius)) {
    return { error: 'Radius must be numeric', status: 400 };
  }

  // Convert the valid string to a number
  const radiusNum = isString ? parseFloat(radius) : radius;

  // Check if the conversion to number was successful and the value is within range
  if (isNaN(radiusNum) || radiusNum < 1 || radiusNum > 100) {
    return { error: 'Radius must be between 1 and 100', status: 400 };
  }

  // Calculate the area of the circle using the radius
  const area = Math.PI * Math.pow(radiusNum, 2);
  return { success: true, area: area.toFixed(2) };
}

app.post('/calculate-area', (req, res) => {
    const { radius } = req.body;
    if (!radius) {
      console.error('Server Error: Radius must be provided');
      return res.status(400).json({ error: 'Radius must be provided' });
    }
    const result = calculateArea(radius);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result);
});

app.get('/calculate-area', (req, res) => {
    const { radius } = req.query;
  
    if (!radius) {
      console.error('Server Error: Radius must be provided');
      return res.status(400).json({ error: 'Radius must be provided' });
    }
    const result = calculateArea(radius);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
